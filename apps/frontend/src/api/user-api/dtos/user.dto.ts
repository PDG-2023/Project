import { EntityDto } from "../../_lib/entity-api/dtos";

export interface UserDto extends EntityDto {
	email: string;
	firstName: string;
	lastName: string;
}
