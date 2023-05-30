import { Injectable } from "@angular/core";

import { MovementCreateDto, MovementDto, MovementUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";

export const MOVEMENT_API_ENDPOINT = "/movements";

@Injectable({
	providedIn: "root"
})
export class MovementApiService extends EntityApiService<
	MovementDto,
	MovementCreateDto,
	MovementUpdateDto
> {
	public override getEntrypoint(): string {
		return MOVEMENT_API_ENDPOINT;
	}
}
