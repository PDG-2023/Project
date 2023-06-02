import { Injectable } from "@angular/core";

import { LocationCreateDto, LocationDto, LocationUpdateDto } from "./dtos";
import { EntityApiService, EntityFindQuery } from "../_lib/entity-api";
import { inventorySingleEntrypoint } from "../inventory-api/inventory-api.shared.api";

export const LOCATION_API_ENDPOINT = "/locations";

@Injectable({
	providedIn: "root"
})
export class LocationApiService extends EntityApiService<
	LocationDto,
	LocationCreateDto,
	LocationUpdateDto
> {
	public override getEntrypoint(): string {
		return LOCATION_API_ENDPOINT;
	}

	public findAndCountByInventory(inventory: number, query?: EntityFindQuery<LocationDto>) {
		return this._findAndCount(
			{ uri: `${inventorySingleEntrypoint(inventory)}${LOCATION_API_ENDPOINT}` },
			query
		);
	}
}
