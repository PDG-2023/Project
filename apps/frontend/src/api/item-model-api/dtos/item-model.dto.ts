import { EntityDto } from "../../_lib/entity-api/dtos";

export interface ItemModelDto extends EntityDto {
	/**
	 * [Categories]{@link CategoryDto} of this item-model.
	 */
	categories: number[];
	description: string;
	name: string;
}
