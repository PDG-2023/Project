import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";

import { LoadState } from "../../../../../_lib/load-state";
import { CategoryApiService } from "../../../../../api/category-api";
import { CategoryDto } from "../../../../../api/category-api/dtos";
import { InventoryDto } from "../../../../../api/inventory-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../../components/dialogs/confirm/confirm.dialog";
import { InventoryService } from "../../../../inventory/inventory.service";
import { CategoriesView } from "../categories.view";

type PathParam = "category";

@Component({
	styleUrls: ["./category-edit.view.scss"],
	templateUrl: "./category-edit.view.html"
})
export class CategoryEditView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM: PathParam = "category";

	public static get ROUTE_PATH() {
		return `:${CategoryEditView.PATH_PARAM}/edit`;
	}

	/**
	 * @param inventory The current inventory
	 * @param category The category to edit
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, category: number): string {
		return `${CategoriesView.getPathForOne(inventory, category)}/edit`;
	}
	protected readonly CategoriesView = CategoriesView;

	protected inventory!: InventoryDto;

	protected categoryState: LoadState<CategoryDto> = { error: false, loading: false };
	protected parent: CategoryDto | null = null;

	protected readonly nameControl = new FormControl("", {
		nonNullable: true,
		validators: [control => Validators.minLength(4)(control)]
	});

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly inventoryService: InventoryService,
		private readonly categoryApi: CategoryApiService,
		private readonly matDialog: MatDialog,
		private readonly router: Router,
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
				void this.loadCategory(+params[CategoryEditView.PATH_PARAM]);
			})
		);
	}

	protected handleDelete(category: CategoryDto) {
		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.delete"),
						confirmColor: "warn",
						description: this.translateService.get(
							"views.category-edit.dialogs.delete.description"
						),
						title: this.translateService.get("views.category-edit.dialogs.delete.title")
					}
				})
				.afterClosed()
		).then(confirmed => {
			if (!confirmed) {
				return;
			}
			void this.categoryApi
				.delete(category.id)
				.then(() =>
					this.router.navigate([
						this.parent
							? CategoriesView.getPathForOne(this.inventory.id, this.parent.id)
							: CategoriesView.getPath(this.inventory.id)
					])
				);
		});
	}

	protected handleUpdate(category: CategoryDto) {
		if (this.nameControl.invalid) {
			return;
		}

		return this.categoryApi
			.replace(category.id, { ...category, name: this.nameControl.value })
			.then(() => this.loadCategory(category.id));
	}

	private loadCategory(id: number) {
		this.categoryState.loading = true;
		return this.categoryApi
			.findById(id)
			.then(async category => {
				this.categoryState.data = category;
				this.nameControl.setValue(category.name);

				this.parent = category.parentCategoryId
					? await this.categoryApi.findById(category.parentCategoryId)
					: null;
			})
			.catch(e => (this.categoryState.error = e as HttpErrorResponse))
			.finally(() => (this.categoryState.loading = false));
	}
}
