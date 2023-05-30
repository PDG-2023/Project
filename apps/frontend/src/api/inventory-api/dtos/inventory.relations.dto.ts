import { InventoryDto } from "./inventory.dto";
import { UserDto } from "../../user-api/dtos";

export interface InventoryRelationsDto extends InventoryDto {
	owner: UserDto;
}
