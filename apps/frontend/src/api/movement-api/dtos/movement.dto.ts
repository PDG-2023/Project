import { EntityDto } from "../../_lib/entity-api/dtos";

export type MovementType = "IN" | "OUT";

export interface MovementDto extends EntityDto {
	itemId: number;
	locationId: number;
	movementType: MovementType;
}
