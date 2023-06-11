import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";

import { CategoryEditView } from "./category-edit/category-edit.view";
import { LoadState } from "../../../../_lib/load-state";
import { FoundAndTotal } from "../../../../api/_lib/entity-api";
import { CategoryApiService } from "../../../../api/category-api";
import { CategoryDto } from "../../../../api/category-api/dtos";
import { InventoryDto } from "../../../../api/inventory-api/dtos";
import { ItemModelApiService } from "../../../../api/item-model-api";
import { ItemModelDto } from "../../../../api/item-model-api/dtos";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import {
	DescribableBrowserComponent,
	DescribableBrowserLoaderParams,
	DescribableWithMeta
} from "../../../components/describables/describable-browser/describable-browser.component";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../components/dialogs/confirm/confirm.dialog";
import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";

@Component({
	styleUrls: ["./categories.view.scss"],
	templateUrl: "./categories.view.html"
})
export class CategoriesView extends SubscribableComponent implements OnInit {
	/**
	 * The path for the routes configuration
	 */
	public static readonly ROUTE_PATH = "categories";

	private static readonly PATH_FOR_ONE_PARAM = "category";

	public static get ROUTE_PATH_FOR_ONE_PARAM() {
		return `:${this.PATH_FOR_ONE_PARAM}`;
	}

	/**
	 * @param inventory The current inventory
	 * @returns the path for this view
	 */
	public static getPath(inventory: number): string {
		return `${InventoryView.getPath(inventory)}/${this.ROUTE_PATH}`;
	}

	/**
	 * @param inventory The current inventory
	 * @param category The category to see
	 * @returns the path for this view
	 */
	public static getPathForOne(inventory: number, category: number): string {
		return `${CategoriesView.getPath(inventory)}/${category}`;
	}

	protected inventory!: InventoryDto;

	/**
	 * null on root view
	 */
	protected categoryState: LoadState<CategoryDto> | null = null;
	protected parents: CategoryDto[] = [];
	protected readonly addCategoryNameControl = new FormControl("", {
		nonNullable: true,
		validators: [control => Validators.required(control)]
	});

	@ViewChild("browserCategories")
	private browserCategories?: DescribableBrowserComponent;
	@ViewChild("browserItems")
	private browserItems?: DescribableBrowserComponent;

	/**
	 * @returns the direct parent
	 */
	protected get parent(): CategoryDto | null {
		return this.parents.length ? this.parents[this.parents.length - 1] : null;
	}

	protected get ROOT_PATH() {
		return CategoriesView.getPath(this.inventory.id);
	}

	public constructor(
		private readonly inventoryService: InventoryService,
		private readonly categoryApi: CategoryApiService,
		private readonly itemModelApi: ItemModelApiService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly matDialog: MatDialog,
		private readonly translateService: TranslateService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.inventoryService.inventoryExiting$.subscribe(
				inventory => (this.inventory = inventory)
			),
			// eslint-disable-next-line @typescript-eslint/no-misused-promises -- KIS
			this.activatedRoute.params.subscribe(async params => {
				const catId = params[CategoriesView.PATH_FOR_ONE_PARAM] as string | undefined;
				if (catId && !Number.isNaN(+catId)) {
					const categoryId = +catId;
					const state: LoadState<CategoryDto> = (this.categoryState = {
						error: false,
						loading: true
					});

					await this.categoryApi
						.findById(categoryId)
						.then(category => (state.data = category))
						.then(async category => {
							const parents = [];
							let child = category;

							while (child.parentCategoryId) {
								const parent = await this.categoryApi.findById(
									child.parentCategoryId
								);
								parents.unshift(parent);
								child = parent;
							}

							this.parents = parents;
						})
						.catch(e => (state.error = e as HttpErrorResponse));

					state.loading = false;

					if (!state.error) {
						if (this.browserCategories) {
							void this.browserCategories.refresh();
						}

						if (this.browserItems) {
							void this.browserItems.refresh();
						}
					}
				} else {
					this.categoryState = null;
				}
			})
		);
	}

	protected addNewCategory() {
		if (this.addCategoryNameControl.invalid) {
			return;
		}

		void this.categoryApi
			.createForInventory(this.inventory.id, {
				description: "",
				name: this.addCategoryNameControl.value,
				parentCategoryId: this.categoryState?.data?.id ?? null
			})
			.then(() => {
				this.addCategoryNameControl.setValue("");
				return this.browserCategories?.refresh();
			});
	}

	protected loadCategories(
		params: DescribableBrowserLoaderParams
	): Promise<FoundAndTotal<DescribableWithMeta<CategoryDto>>> {
		const { offset, search, size } = params;

		return this.categoryApi
			.findAndCountByInventory(this.inventory.id, {
				limit: size,
				offset,
				where: {
					name: { $like: `%${search}%` },
					parent: { id: { $eq: this.categoryState?.data?.id ?? null } }
				}
			})
			.then(data => ({
				data: data.data.map<DescribableWithMeta<CategoryDto>>(category => ({
					canRemove: !!this.categoryState?.data?.id,
					data: category,
					hrefEdit: this.getCategoryHrefEdit(category),
					hrefShow: this.getCategoryHrefShow(category)
				})),
				total: data.total
			}))
			.then(data => {
				for (const category of data.data) {
					// async
					void this.categoryApi
						.findAndCountByInventory(this.inventory.id, {
							limit: 0,
							offset: 0,
							where: { parent: { id: { $eq: category.data.id } } }
						})
						.then(({ total }) => (category.hasChildren = !!total));
				}

				return data;
			});
	}

	protected getCategoryHrefShow(category: CategoryDto) {
		return CategoriesView.getPathForOne(this.inventory.id, category.id);
	}
	protected getCategoryHrefEdit(category: CategoryDto) {
		return CategoryEditView.getPath(this.inventory.id, category.id);
	}

	protected handleCategoryRemove(category: CategoryDto) {
		const categoryId = this.categoryState?.data?.id;
		if (!categoryId) {
			return Promise.resolve();
		}

		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.remove"),
						confirmColor: "warn",
						description: this.translateService.get(
							"views.categories.dialogs.remove-category.description"
						),
						title: this.translateService.get(
							"views.categories.dialogs.remove-category.title"
						)
					}
				})
				.afterClosed()
		).then(confirmed => {
			if (!confirmed) {
				return;
			}

			void this.categoryApi
				.replace(category.id, {
					...category,
					parentCategoryId: this.parent?.id ?? null
				})
				.then(() => this.browserCategories?.refresh());
		});
	}

	protected loadItems(
		params: DescribableBrowserLoaderParams
	): Promise<FoundAndTotal<DescribableWithMeta<ItemModelDto>>> {
		if (!this.categoryState?.data?.id) {
			return Promise.resolve({ data: [], total: 0 });
		}

		const { offset, search, size } = params;

		return this.itemModelApi
			.findAndCountByInventory(this.inventory.id, {
				limit: size,
				offset,
				where: {
					categories: { id: { $eq: this.categoryState.data.id } },
					name: { $like: `%${search}%` }
				}
			})
			.then(data => ({
				data: data.data.map(item => ({
					canRemove: true,
					data: item,
					// TODO
					hrefEdit: "",
					hrefShow: ""
				})),
				total: data.total
			}));
	}

	protected handleItemRemove(itemModel: ItemModelDto) {
		const categoryId = this.categoryState?.data?.id;
		if (!categoryId) {
			return Promise.resolve();
		}

		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.remove"),
						confirmColor: "warn",
						description: this.translateService.get(
							"views.categories.dialogs.remove-item.description"
						),
						title: this.translateService.get(
							"views.categories.dialogs.remove-item.title"
						)
					}
				})
				.afterClosed()
		).then(confirmed => {
			if (!confirmed) {
				return;
			}

			void this.itemModelApi
				.replace(itemModel.id, {
					...itemModel,
					categories: itemModel.categories.filter(id => id !== categoryId)
				})
				.then(() => this.browserItems?.refresh());
		});
	}
}
