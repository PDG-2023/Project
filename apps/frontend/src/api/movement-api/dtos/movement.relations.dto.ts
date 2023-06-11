import { MovementDto, MovementType } from "./movement.dto";
import { ItemRelationsDto } from "../../item-api/dtos";
import { LocationRelationsDto } from "../../location-api/dtos";

export interface MovementRelationsDto extends Omit<MovementDto, "movementType"> {
	item: ItemRelationsDto;
	location: LocationRelationsDto;
	type: MovementType;
}
