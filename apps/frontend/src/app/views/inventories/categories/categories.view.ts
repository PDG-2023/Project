import { Component } from "@angular/core";

import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";

@Component({
	styleUrls: ["./categories.view.scss"],
	templateUrl: "./categories.view.html"
})
export class CategoriesView {
	/**
	 * The path for the routes configuration
	 */
	public static readonly ROUTE_PATH = "categories";

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
