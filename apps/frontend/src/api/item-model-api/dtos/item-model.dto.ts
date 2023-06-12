import { DescribableDto } from "../../_lib/entity-api/dtos";

export interface ItemModelDto extends DescribableDto {
	/**
	 * [Categories]{@link CategoryDto} of this item-model.
	 */
	categories: number[];
}
