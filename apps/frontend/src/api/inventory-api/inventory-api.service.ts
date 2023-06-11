import { Injectable } from "@angular/core";

import {
	InventoryCreateDto,
	InventoryDto,
	InventoryRelationsDto,
	InventorySearchEntityType,
	InventorySearchResultDto,
	InventoryUpdateDto
} from "./dtos";
import { inventorySingleEntrypoint } from "./inventory-api.shared.api";
import { EntityApiService } from "../_lib/entity-api";
import { EntityFindQuery } from "../_lib/entity-api/entity-api.types";

export const INVENTORY_API_ENDPOINT = "/inventories";

export type InventorySearchResults = Record<InventorySearchEntityType, InventorySearchResultDto[]>;

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

	public search(id: number, search: string): Promise<InventorySearchResults> {
		return this.client
			.get<InventorySearchResultDto[]>(`${inventorySingleEntrypoint(id)}/search`, {
				params: { searchTerm: search }
			})
			.then(results =>
				results.reduce<InventorySearchResults>(
					(previousValue, currentValue) => ({
						...previousValue,
						[currentValue.entityType]: [
							...previousValue[currentValue.entityType],
							currentValue
						]
					}),
					{
						itemModel: [],
						location: [],
						user: []
					}
				)
			);
	}
}
