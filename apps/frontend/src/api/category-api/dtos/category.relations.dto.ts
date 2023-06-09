import { CategoryDto } from "./category.dto";

export interface CategoryRelationsDto extends CategoryDto {
	/**
	 * Can not exist
	 */
	parent: CategoryDto;
}
