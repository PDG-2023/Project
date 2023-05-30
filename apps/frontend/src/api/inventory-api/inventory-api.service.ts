import { Injectable } from "@angular/core";

import {
	InventoryCreateDto,
	InventoryDto,
	InventoryRelationsDto,
	InventoryUpdateDto
} from "./dtos";
import { EntityApiService } from "../_lib/entity-api";
import { EntityFindQuery } from "../_lib/entity-api/entity-api.types";

export const INVENTORY_API_ENDPOINT = "/inventories";

@Injectable({
	providedIn: "root"
})
export class InventoryApiService extends EntityApiService<
	InventoryDto,
	InventoryCreateDto,
	InventoryUpdateDto,
	EntityFindQuery<InventoryRelationsDto>
> {
	public override getEntrypoint(): string {
		return INVENTORY_API_ENDPOINT;
	}
}
