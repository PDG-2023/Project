import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { debounceTime, distinctUntilChanged, lastValueFrom, tap } from "rxjs";

import { LoadState } from "../../../../../_lib/load-state";
import { FoundAndTotal } from "../../../../../api/_lib/entity-api";
import { CategoryApiService } from "../../../../../api/category-api";
import { CategoryDto } from "../../../../../api/category-api/dtos";
import { InventoryDto } from "../../../../../api/inventory-api/dtos";
import { ItemModelApiService } from "../../../../../api/item-model-api";
import { ItemModelDto } from "../../../../../api/item-model-api/dtos";
import { LocationApiService } from "../../../../../api/location-api";
import { LocationDto } from "../../../../../api/location-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import {
	DescribableBrowserComponent,
	DescribableBrowserLoaderParams,
	DescribableWithMeta
} from "../../../../components/describables/describable-browser/describable-browser.component";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../../components/dialogs/confirm/confirm.dialog";
import { InventoryService } from "../../../../inventory/inventory.service";
import { CategoriesView } from "../../categories/categories.view";
import { CategoryEditView } from "../../categories/category-edit/category-edit.view";
import { LocationEditView } from "../../locations/location-edit/location-edit.view";
import { LocationsView } from "../../locations/locations.view";
import { ItemModelEditView } from "../item-model-edit/item-model-edit.view";
import { ItemModelsView } from "../item-models.view";

@Component({
	styleUrls: ["./item-model.view.scss"],
	templateUrl: "./item-model.view.html"
})
export class ItemModelView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM = "item-model";

	public static get ROUTE_PATH() {
		return `:${ItemModelView.PATH_PARAM}`;
	}

	/**
	 * @param inventory The current inventory
	 * @param itemModel The location to see
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, itemModel: number): string {
		return `${ItemModelsView.getPath(inventory)}/${itemModel}`;
	}

	protected readonly ItemModelEditView = ItemModelEditView;

	protected inventory!: InventoryDto;
	protected itemModelState: LoadState<ItemModelDto> = { error: false, loading: false };

	protected searchCategorySelected: CategoryDto | null = null;
	protected readonly searchCategoryState: LoadState<CategoryDto[]> = {
		error: false,
		loading: false
	};
	protected readonly searchCategoryControl = new FormControl("");

	@ViewChild("browserCategories")
	private browserCategories?: DescribableBrowserComponent;
	@ViewChild("browserLocations")
	private browserLocations?: DescribableBrowserComponent;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly inventoryService: InventoryService,
		private readonly categoryApi: CategoryApiService,
		private readonly itemModelApi: ItemModelApiService,
		private readonly locationApi: LocationApiService,
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
			this.activatedRoute.params.subscribe(params => {
				// Even if it is not a number
				void this.loadItemModel(+params[ItemModelView.PATH_PARAM]);
			}),
			this.searchCategoryControl.valueChanges
				.pipe(
					tap(() => {
						this.searchCategorySelected = null;
						this.searchCategoryState.loading = true;
					}),
					debounceTime(250),
					distinctUntilChanged()
				)
				.subscribe(search => {
					void this.searchCategory(search ?? "");
				})
		);
	}

	protected loadCategories(
		params: DescribableBrowserLoaderParams
	): Promise<FoundAndTotal<DescribableWithMeta<CategoryDto>>> {
		const id = this.itemModelState.data?.id;
		if (!id) {
			return Promise.resolve({ data: [], total: 0 });
		}

		const { offset, search, size } = params;

		return this.categoryApi
			.findAndCountByInventory(this.inventory.id, {
				limit: size,
				offset,
				where: {
					itemModels: { id: { $eq: id } },
					name: { $like: `%${search}%` }
				}
			})
			.then(data => ({
				data: data.data.map<DescribableWithMeta<CategoryDto>>(category => ({
					canRemove: true,
					data: category,
					hrefEdit: CategoryEditView.getPath(this.inventory.id, category.id),
					hrefShow: CategoriesView.getPathForOne(this.inventory.id, category.id)
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

	protected handleCategoryRemove(category: CategoryDto) {
		const itemModel = this.itemModelState.data;
		if (!itemModel) {
			return Promise.resolve();
		}

		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.remove"),
						confirmColor: "warn",
						description: this.translateService.get(
							"views.item-model.dialogs.remove-category.description"
						),
						title: this.translateService.get(
							"views.item-model.dialogs.remove-category.title"
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
					categories: itemModel.categories.filter(id => id !== category.id)
				})
				.then(() => this.browserCategories?.refresh());
		});
	}

	protected loadLocations(
		params: DescribableBrowserLoaderParams
	): Promise<FoundAndTotal<DescribableWithMeta<LocationDto>>> {
		const id = this.itemModelState.data?.id;
		if (!id) {
			return Promise.resolve({ data: [], total: 0 });
		}

		const { offset, search, size } = params;

		return this.locationApi
			.findAndCountByInventory(this.inventory.id, {
				limit: size,
				offset,
				where: {
					movements: { item: { model: { id: { $eq: id } } } },
					name: { $like: `%${search}%` }
				}
			})
			.then(data => ({
				data: data.data.map<DescribableWithMeta<LocationDto>>(location => ({
					canRemove: false,
					data: location,
					hrefEdit: LocationEditView.getPath(this.inventory.id, location.id),
					hrefShow: LocationsView.getPathForOne(this.inventory.id, location.id)
				})),
				total: data.total
			}))
			.then(data => {
				for (const location of data.data) {
					// async
					void this.locationApi
						.findAndCountByInventory(this.inventory.id, {
							limit: 0,
							offset: 0,
							where: { parent: { id: { $eq: location.data.id } } }
						})
						.then(({ total }) => (location.hasChildren = !!total));
				}

				return data;
			});
	}

	protected addToCategory() {
		const itemModel = this.itemModelState.data;

		if (!this.searchCategorySelected || !itemModel) {
			return Promise.resolve();
		}

		return this.itemModelApi
			.replace(itemModel.id, {
				...itemModel,
				categories: [...itemModel.categories, this.searchCategorySelected.id]
			})
			.then(() => {
				this.searchCategorySelected = null;
				this.searchCategoryControl.setValue("");
				return this.browserCategories?.refresh();
			});
	}

	protected displayCategory(category: CategoryDto) {
		return category.name;
	}

	private loadItemModel(id: number) {
		this.itemModelState.error = false;
		this.itemModelState.loading = true;

		return this.itemModelApi
			.findById(id)
			.then(item => (this.itemModelState.data = item))
			.catch(e => (this.itemModelState.error = e as HttpErrorResponse))
			.finally(() => (this.itemModelState.loading = false));
	}

	private searchCategory(search: string) {
		this.searchCategoryState.error = false;
		this.searchCategoryState.loading = true;

		return this.categoryApi
			.findAndCountByInventory(this.inventory.id, {
				where: { name: { $like: `%${search}%` } }
			})
			.then(data => {
				const loaded = (this.browserCategories?.data ?? []).map(({ data: { id } }) => id);
				this.searchCategoryState.data = data.data.filter(cat => !loaded.includes(cat.id));
			})
			.catch(e => (this.searchCategoryState.error = e as HttpErrorResponse))
			.finally(() => (this.searchCategoryState.loading = false));
	}
}
