import { Injectable } from "@angular/core";

import { LocationCreateDto, LocationDto, LocationRelationsDto, LocationUpdateDto } from "./dtos";
import { EntityApiService, EntityFindQuery } from "../_lib/entity-api";
import { inventorySingleEntrypoint } from "../inventory-api/inventory-api.shared.api";

export const LOCATION_API_ENDPOINT = "/locations";

@Injectable({
	providedIn: "root"
})
export class LocationApiService extends EntityApiService<
	LocationDto,
	LocationCreateDto,
	LocationUpdateDto,
	EntityFindQuery<LocationRelationsDto>
> {
	public override getEntrypoint(): string {
		return LOCATION_API_ENDPOINT;
	}

	public findAndCountByInventory(
		inventory: number,
		query?: EntityFindQuery<LocationRelationsDto>
	) {
		return this._findAndCount(
			{ uri: `${inventorySingleEntrypoint(inventory)}${LOCATION_API_ENDPOINT}` },
			query
		);
	}

	public createForInventory(inventory: number, body: LocationCreateDto) {
		return this.client.post<LocationDto>(
			`${inventorySingleEntrypoint(inventory)}${LOCATION_API_ENDPOINT}`,
			body
		);
	}
}
