import { Injectable } from "@angular/core";
import { BehaviorSubject, filter } from "rxjs";

import { InventoryApiService } from "../../api/inventory-api";
import { InventoryDto } from "../../api/inventory-api/dtos";

@Injectable({
	providedIn: "root"
})
export class InventoryService {
	private readonly currentInventory = new BehaviorSubject<InventoryDto | null>(null);

	/**
	 * @returns the current active inventory or null
	 */
	public get inventoryCurrent$() {
		return this.currentInventory.asObservable();
	}

	/**
	 * @returns only an existing current inventory
	 */
	public get inventoryExiting$() {
		return this.inventoryCurrent$.pipe(
			filter(
				(inventory => !!inventory) as (value: InventoryDto | null) => value is InventoryDto
			)
		);
	}

	/**
	 * @returns the current active inventory or null at the moment
	 */
	public get inventoryCurrent() {
		return this.currentInventory.value;
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

	/**
	 * Set the current inventory
	 * @param inventory the inventory to set
	 */
	public setInventory(inventory: InventoryDto) {
		this.currentInventory.next(inventory);
	}

	public removeCurrent() {
		this.currentInventory.next(null);
	}

	// TODO: get current active inventory (+ store for when the user refresh page)
}
