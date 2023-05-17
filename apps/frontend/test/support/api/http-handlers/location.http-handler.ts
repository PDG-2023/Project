import { EntityHttpHandler } from "./_lib/entity.http-handler";
import { LOCATION_API_ENDPOINT } from "../../../../src/api/location-api";
import { LocationDto as Dto } from "../../../../src/api/location-api/dtos";

export class LocationHttpHandler extends EntityHttpHandler<Dto> {
	protected override getEntryPoint(): string {
		return LOCATION_API_ENDPOINT;
	}

	protected verifyCreate(data: unknown) {
		if (!data) {
			return 400;
		}

		return data as Dto;
	}

	protected verifyUpdate(data: unknown, stored: Dto) {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
