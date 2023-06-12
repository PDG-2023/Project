import { ItemDto } from "./item.dto";
import { ItemModelRelationsDto } from "../../item-model-api/dtos";
import { MovementRelationsDto } from "../../movement-api/dtos";

export interface ItemRelationsDto extends ItemDto {
	model: ItemModelRelationsDto;
	movements: MovementRelationsDto;
}
