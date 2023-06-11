import { Injectable } from "@angular/core";

import {
	ItemModelCreateDto,
	ItemModelDto,
	ItemModelRelationsDto,
	ItemModelUpdateDto
} from "./dtos";
import { EntityApiService, EntityFindQuery } from "../_lib/entity-api";
import { inventorySingleEntrypoint } from "../inventory-api/inventory-api.shared.api";

export const ITEM_MODEL_API_ENDPOINT = "/item-models";

@Injectable({
	providedIn: "root"
})
export class ItemModelApiService extends EntityApiService<
	ItemModelDto,
	ItemModelCreateDto,
	ItemModelUpdateDto,
	EntityFindQuery<ItemModelRelationsDto>
> {
	public override getEntrypoint(): string {
		return ITEM_MODEL_API_ENDPOINT;
	}

	public findAndCountByInventory(
		inventory: number,
		query?: EntityFindQuery<ItemModelRelationsDto>
	) {
		return this._findAndCount(
			{ uri: `${inventorySingleEntrypoint(inventory)}${ITEM_MODEL_API_ENDPOINT}` },
			query
		);
	}

	public createForInventory(inventory: number, body: ItemModelCreateDto) {
		return this.client.post<ItemModelDto>(
			`${inventorySingleEntrypoint(inventory)}${ITEM_MODEL_API_ENDPOINT}`,
			body
		);
	}
}
