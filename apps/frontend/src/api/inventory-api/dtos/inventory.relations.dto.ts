import { InventoryDto } from "./inventory.dto";
import { ItemModelRelationsDto } from "../../item-model-api/dtos";
import { UserDto } from "../../user-api/dtos";

export interface InventoryRelationsDto extends InventoryDto {
	itemModels: ItemModelRelationsDto;
	owner: UserDto;
}
