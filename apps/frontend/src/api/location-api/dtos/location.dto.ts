import { EntityDto } from "../../_lib/entity-api/dtos";

export interface LocationDto extends EntityDto {
	description: string;
	name: string;
	parentLocationId: number;
}
