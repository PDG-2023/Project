import { Injectable } from "@angular/core";

import { LocationCreateDto, LocationDto, LocationUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";

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
}
