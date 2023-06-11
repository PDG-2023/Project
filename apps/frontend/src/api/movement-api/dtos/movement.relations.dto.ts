import { MovementDto, MovementType } from "./movement.dto";
import { LocationRelationsDto } from "../../location-api/dtos";

export interface MovementRelationsDto extends Omit<MovementDto, "movementType"> {
	location: LocationRelationsDto;
	type: MovementType;
}
