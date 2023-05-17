import { Injectable } from "@angular/core";

import { InventoryCreateDto, InventoryDto, InventoryUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";

export const INVENTORY_API_ENDPOINT = "/inventories";

@Injectable({
	providedIn: "root"
})
export class InventoryApiService extends EntityApiService<
	InventoryDto,
	InventoryCreateDto,
	InventoryUpdateDto
> {
	public override getEntrypoint(): string {
		return INVENTORY_API_ENDPOINT;
	}
}
