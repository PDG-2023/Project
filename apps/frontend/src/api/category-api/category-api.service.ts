import { Injectable } from "@angular/core";

import { CategoryCreateDto, CategoryDto, CategoryUpdateDto } from "./dtos";
import { EntityApiService, EntityFindQuery } from "../_lib/entity-api";
import { inventorySingleEntrypoint } from "../inventory-api/inventory-api.shared.api";

export const CATEGORY_API_ENDPOINT = "/categories";

@Injectable({
	providedIn: "root"
})
export class CategoryApiService extends EntityApiService<
	CategoryDto,
	CategoryCreateDto,
	CategoryUpdateDto
> {
	public override getEntrypoint(): string {
		return CATEGORY_API_ENDPOINT;
	}

	public findAndCountByInventory(inventory: number, query: EntityFindQuery<CategoryDto>) {
		return this._findAndCount(
			{ uri: `${inventorySingleEntrypoint(inventory)}${CATEGORY_API_ENDPOINT}` },
			query
		);
	}
}
