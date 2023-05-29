import { Injectable } from "@angular/core";

import { LocationCreateDto, LocationDto, LocationUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";
import { EntityFindQuery } from "../_lib/entity-api/entity-api.types";

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

	public findAndCountByInventory(inventory: number, query: EntityFindQuery<LocationDto>) {
		// TODO: the others + inventory endpoint variable
		return this._findAndCount(
			{ uri: `/inventory/${inventory}${LOCATION_API_ENDPOINT}` },
			query
		);
	}
}
