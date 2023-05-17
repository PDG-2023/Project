import { EntityHttpHandler } from "./_lib/entity.http-handler";
import { MOVEMENT_API_ENDPOINT } from "../../../../src/api/movement-api";
import { MovementDto as Dto } from "../../../../src/api/movement-api/dtos";

export class MovementHttpHandler extends EntityHttpHandler<Dto> {
	protected override getEntryPoint(): string {
		return MOVEMENT_API_ENDPOINT;
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
