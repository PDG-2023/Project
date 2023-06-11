import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ItemModelView } from "./item-model/item-model.view";
import { ItemModelEditView } from "./item-model-edit/item-model-edit.view";
import { FoundAndTotal } from "../../../../api/_lib/entity-api";
import { InventoryDto } from "../../../../api/inventory-api/dtos";
import { ItemModelApiService } from "../../../../api/item-model-api";
import { ItemModelDto } from "../../../../api/item-model-api/dtos";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import {
	DescribableBrowserLoaderParams,
	DescribableWithMeta
} from "../../../components/describables/describable-browser/describable-browser.component";
import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";

@Component({
	styleUrls: ["./item-models.view.scss"],
	templateUrl: "./item-models.view.html"
})
export class ItemModelsView extends SubscribableComponent implements OnInit {
	/**
	 * The path for the routes configuration
	 */
	public static readonly ROUTE_PATH = "item-models";

	/**
	 * @param inventory The current inventory
	 * @returns the path for this view
	 */
	public static getPath(inventory: number): string {
		return `${InventoryView.getPath(inventory)}/${this.ROUTE_PATH}`;
	}

	protected inventory!: InventoryDto;

	protected readonly addItemNameControl = new FormControl("", {
		nonNullable: true,
		validators: [control => Validators.required(control)]
	});

	public constructor(
		private readonly inventoryService: InventoryService,
		private readonly itemModelApi: ItemModelApiService,
		private readonly router: Router
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.inventoryService.inventoryExiting$.subscribe(
				inventory => (this.inventory = inventory)
			)
		);
	}

	protected addNewItemModel() {
		if (this.addItemNameControl.invalid) {
			return;
		}

		void this.itemModelApi
			.createForInventory(this.inventory.id, {
				categories: [],
				description: "",
				name: this.addItemNameControl.value
			})
			.then(created =>
				this.router.navigate([ItemModelEditView.getPath(this.inventory.id, created.id)])
			);
	}

	protected loadItems(
		params: DescribableBrowserLoaderParams
	): Promise<FoundAndTotal<DescribableWithMeta<ItemModelDto>>> {
		const { offset, search, size } = params;

		return this.itemModelApi
			.findAndCountByInventory(this.inventory.id, {
				limit: size,
				offset,
				where: { name: { $like: `%${search}%` } }
			})
			.then(data => ({
				data: data.data.map(item => ({
					canRemove: false,
					data: item,
					hrefEdit: ItemModelEditView.getPath(this.inventory.id, item.id),
					hrefShow: ItemModelView.getPath(this.inventory.id, item.id)
				})),
				total: data.total
			}));
	}
}
