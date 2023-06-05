import { Component } from "@angular/core";
import { concatMap } from "rxjs";

import { CategoryApiService } from "../../../../api/category-api";
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
	protected readonly inventoryCurrent$ = this.inventoryService.inventoryExiting$;

	protected readonly categories$ = this.inventoryCurrent$.pipe(
		concatMap(inventory => this.categoryApi.findAndCountByInventory(inventory.id))
	);

	public constructor(
		private readonly inventoryService: InventoryService,
		private readonly categoryApi: CategoryApiService
	) {}
}
