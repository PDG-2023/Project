import { CategoryDto } from "./category.dto";
import { ItemModelRelationsDto } from "../../item-model-api/dtos";

export interface CategoryRelationsDto extends CategoryDto {
	itemModels: ItemModelRelationsDto;
	/**
	 * Can not exist
	 */
	parent: CategoryRelationsDto;
}
