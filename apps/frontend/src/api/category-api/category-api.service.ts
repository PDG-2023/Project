import { Injectable } from "@angular/core";

import { CategoryCreateDto, CategoryDto, CategoryRelationsDto, CategoryUpdateDto } from "./dtos";
import { EntityApiService, EntityFindQuery } from "../_lib/entity-api";
import { inventorySingleEntrypoint } from "../inventory-api/inventory-api.shared.api";

export const CATEGORY_API_ENDPOINT = "/categories";

@Injectable({
	providedIn: "root"
})
export class CategoryApiService extends EntityApiService<
	CategoryDto,
	CategoryCreateDto,
	CategoryUpdateDto,
	EntityFindQuery<CategoryRelationsDto>
> {
	public override getEntrypoint(): string {
		return CATEGORY_API_ENDPOINT;
	}

	public findAndCountByInventory(
		inventory: number,
		query?: EntityFindQuery<CategoryRelationsDto>
	) {
		return this._findAndCount(
			{ uri: `${inventorySingleEntrypoint(inventory)}${CATEGORY_API_ENDPOINT}` },
			query
		);
	}

	public createForInventory(inventory: number, body: CategoryCreateDto) {
		return this.client.post(
			`${inventorySingleEntrypoint(inventory)}${CATEGORY_API_ENDPOINT}`,
			body
		);
	}
}
