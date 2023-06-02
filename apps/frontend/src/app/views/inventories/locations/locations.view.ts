import { Component } from "@angular/core";
import { concatMap } from "rxjs";

import { LocationApiService } from "../../../../api/location-api";
import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";

@Component({
	styleUrls: ["./locations.view.scss"],
	templateUrl: "./locations.view.html"
})
export class LocationsView {
	/**
	 * The path for the routes configuration
	 */
	public static readonly ROUTE_PATH = "locations";

	/**
	 * @param inventory The current inventory
	 * @returns the path for this view
	 */
	public static getPath(inventory: number): string {
		return `${InventoryView.getPath(inventory)}/${this.ROUTE_PATH}`;
	}

	// TODO
	protected readonly inventoryCurrent$ = this.inventoryService.inventoryExiting$;

	protected readonly locations$ = this.inventoryCurrent$.pipe(
		concatMap(inventory => this.locationApi.findAndCountByInventory(inventory.id))
	);

	public constructor(
		private readonly inventoryService: InventoryService,
		private readonly locationApi: LocationApiService
	) {}
}
