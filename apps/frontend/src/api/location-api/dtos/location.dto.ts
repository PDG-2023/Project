import { DescribableDto } from "../../_lib/entity-api/dtos";

export interface LocationDto extends DescribableDto {
	parentLocationId: number | null;
}
