import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { InventoryApiService } from "../../api/inventory-api";
import { InventoryDto } from "../../api/inventory-api/dtos";

@Injectable({
	providedIn: "root"
})
export class InventoryService {
	private readonly currentInventory = new BehaviorSubject<InventoryDto | null>(null);

	/**
	 * @returns the current active location or null
	 */
	public get inventoryCurrent$() {
		return this.currentInventory.asObservable();
	}

	public constructor(public readonly api: InventoryApiService) {}

	/**
	 * Loads the inventory and sets it as the current one.
	 * Removes the current one if the request gets a 404
	 * (there is no path modification)
	 * @param id the id of the inventory to load.
	 * @returns the loaded inventory
	 */
	public async loadInventory(id: number) {
		return this.api.findById(id).then(inventory => {
			this.setInventory(inventory);
			return inventory;
		});
	}

	public removeCurrent() {
		this.currentInventory.next(null);
	}

	private setInventory(inventory: InventoryDto) {
		this.currentInventory.next(inventory);
	}

	// TODO: get current active inventory (+ store for when the user refresh page)
}
