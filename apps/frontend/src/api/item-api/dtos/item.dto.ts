import { EntityDto } from "../../_lib/entity-api/dtos";

export interface ItemDto extends EntityDto {
	/**
	 * foreign key to its [model]{@link ItemModelDto}.
	 */
	modelId: number;
}
