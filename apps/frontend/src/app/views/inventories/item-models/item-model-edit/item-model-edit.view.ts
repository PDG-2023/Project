import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";

import { LoadState } from "../../../../../_lib/load-state";
import { InventoryDto } from "../../../../../api/inventory-api/dtos";
import { ItemModelApiService } from "../../../../../api/item-model-api";
import { ItemModelDto } from "../../../../../api/item-model-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../../components/dialogs/confirm/confirm.dialog";
import { InventoryService } from "../../../../inventory/inventory.service";
import { ItemModelView } from "../item-model/item-model.view";
import { ItemModelsView } from "../item-models.view";

@Component({
	styleUrls: ["./item-model-edit.view.scss"],
	templateUrl: "./item-model-edit.view.html"
})
export class ItemModelEditView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM = "item-model";

	public static get ROUTE_PATH() {
		return `:${ItemModelEditView.PATH_PARAM}/edit`;
	}

	/**
	 * @param inventory The current inventory
	 * @param itemModel The itemModel to see
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, itemModel: number): string {
		return `${ItemModelsView.getPath(inventory)}/${itemModel}/edit`;
	}

	protected readonly ItemModelsView = ItemModelsView;
	protected readonly ItemModelView = ItemModelView;

	protected inventory!: InventoryDto;
	protected itemState: LoadState<ItemModelDto> = { error: false, loading: false };

	protected readonly itemForm = new FormGroup<
		Record<keyof Pick<ItemModelDto, "description" | "name">, FormControl<string>>
	>({
		description: new FormControl("", {
			nonNullable: true,
			validators: [control => Validators.required(control)]
		}),
		name: new FormControl("", {
			nonNullable: true,
			validators: [
				control => Validators.required(control),
				control => Validators.minLength(2)(control)
			]
		})
	});

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly inventoryService: InventoryService,
		private readonly itemModelApi: ItemModelApiService,
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
				void this.loadItem(+params[ItemModelEditView.PATH_PARAM]);
			})
		);
	}
	protected handleDelete(item: ItemModelDto) {
		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.delete"),
						confirmColor: "warn",
						description: this.translateService.get(
							"views.item-model-edit.dialogs.delete.description"
						),
						title: this.translateService.get(
							"views.item-model-edit.dialogs.delete.title"
						)
					}
				})
				.afterClosed()
		).then(confirmed => {
			if (!confirmed) {
				return;
			}
			void this.itemModelApi
				.delete(item.id)
				.then(() => this.router.navigate([ItemModelsView.getPath(this.inventory.id)]));
		});
	}

	protected handleUpdate(item: ItemModelDto) {
		if (this.itemForm.invalid) {
			return;
		}

		const values = this.itemForm.getRawValue();
		return this.itemModelApi
			.replace(item.id, { ...item, ...values })
			.then(() => this.loadItem(item.id));
	}

	private loadItem(id: number) {
		this.itemState.error = false;
		this.itemState.loading = true;

		return this.itemModelApi
			.findById(id)
			.then(item => {
				this.itemState.data = item;

				this.itemForm.setValue({
					description: item.description,
					name: item.name
				});
			})
			.catch(e => (this.itemState.error = e as HttpErrorResponse))
			.finally(() => (this.itemState.loading = false));
	}
}
