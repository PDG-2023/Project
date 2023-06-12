import { DescribableDto } from "../../_lib/entity-api/dtos";

export interface CategoryDto extends DescribableDto {
	parentCategoryId: number | null;
}
