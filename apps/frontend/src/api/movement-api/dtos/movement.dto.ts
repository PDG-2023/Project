import { EntityDto } from "../../_lib/entity-api/dtos";

export interface MovementDto extends EntityDto {
	itemId: number;
	locationId: number;

	type: string;
}
