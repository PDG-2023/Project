import { ItemModelDto } from "./item-model.dto";
import { CategoryDto } from "../../category-api/dtos";

export interface ItemModelRelationsDto extends Omit<ItemModelDto, "categories"> {
	categories: CategoryDto;
}
