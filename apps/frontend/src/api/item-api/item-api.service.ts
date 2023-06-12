import { Injectable } from "@angular/core";

import { ItemCreateDto, ItemDto, ItemRelationsDto, ItemUpdateDto } from "./dtos";
import { EntityApiService, EntityFindQuery } from "../_lib/entity-api";

export const ITEM_API_ENDPOINT = "/items";

@Injectable({
	providedIn: "root"
})
export class ItemApiService extends EntityApiService<
	ItemDto,
	ItemCreateDto,
	ItemUpdateDto,
	EntityFindQuery<ItemRelationsDto>
> {
	public override getEntrypoint(): string {
		return ITEM_API_ENDPOINT;
	}
}
