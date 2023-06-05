import { Component, OnInit } from "@angular/core";

import { InventoryDto } from "../../../../api/inventory-api/dtos";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import { InventoryService } from "../../../inventory/inventory.service";
import { InventoriesView } from "../inventories.view";

export type InventoryViewRouteParam = "inventory";

@Component({
	styleUrls: ["./inventory.view.scss"],
	templateUrl: "./inventory.view.html"
})
export class InventoryView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM: InventoryViewRouteParam = "inventory";

	/**
	 * @returns The path for the routes configuration
	 */
	public static get ROUTE_PATH() {
		return `${InventoriesView.ROUTE_PATH}/:${InventoryView.PATH_PARAM}`;
	}

	/**
	 * @param inventory The current inventory
	 * @returns the path for this view
	 */
	public static getPath(inventory: number): string {
		return `${InventoriesView.PATH}/${inventory}`;
	}

	protected data?: InventoryDto;

	public constructor(private readonly service: InventoryService) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(this.service.inventoryExiting$.subscribe(data => (this.data = data)));
	}
}
