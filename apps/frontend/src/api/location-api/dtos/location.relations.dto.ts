import { LocationDto } from "./location.dto";
import { InventoryRelationsDto } from "../../inventory-api/dtos";
import { MovementRelationsDto } from "../../movement-api/dtos";

export interface LocationRelationsDto extends LocationDto {
	inventory: InventoryRelationsDto;
	movements: MovementRelationsDto;

	/**
	 * Can not exist
	 */
	parent: LocationRelationsDto;
}
