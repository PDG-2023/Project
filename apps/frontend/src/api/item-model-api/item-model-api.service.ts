import { Injectable } from "@angular/core";

import { ItemModelCreateDto, ItemModelDto, ItemModelUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";

export const MODEL_ITEM_API_ENDPOINT = "/model-items";

@Injectable({
	providedIn: "root"
})
export class ItemModelApiService extends EntityApiService<
	ItemModelDto,
	ItemModelCreateDto,
	ItemModelUpdateDto
> {
	public override getEntrypoint(): string {
		return MODEL_ITEM_API_ENDPOINT;
	}
}
