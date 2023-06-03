import { Component } from "@angular/core";

import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";

@Component({
	styleUrls: ["./item-models.view.scss"],
	templateUrl: "./item-models.view.html"
})
export class ItemModelsView {
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

	// TODO
	protected inventoryCurrent$ = this.inventoryService.inventoryCurrent$;

	public constructor(private readonly inventoryService: InventoryService) {}
}
