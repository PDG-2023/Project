import { EntityDto } from "../../_lib/entity-api/dtos";

export interface ItemModelDto extends EntityDto {
	description: string;
	name: string;
}
