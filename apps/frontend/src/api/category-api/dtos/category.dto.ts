import { EntityDto } from "../../_lib/entity-api/dtos";

export interface CategoryDto extends EntityDto {
	description: string;
	name: string;
	parentCategoryId: number | null;
}
