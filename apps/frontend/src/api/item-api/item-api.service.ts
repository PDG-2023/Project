import { Injectable } from "@angular/core";

import { ItemCreateDto, ItemDto, ItemUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";

export const ITEM_API_ENDPOINT = "/items";

@Injectable({
	providedIn: "root"
})
export class ItemApiService extends EntityApiService<ItemDto, ItemCreateDto, ItemUpdateDto> {
	public override getEntrypoint(): string {
		return ITEM_API_ENDPOINT;
	}
}
