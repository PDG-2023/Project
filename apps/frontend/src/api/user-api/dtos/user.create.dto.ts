import { UserDto } from "./user.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export interface UserCreateDto
	extends Partial<Omit<UserDto, EntityDtoKeys | "email">>,
		Pick<UserDto, "email"> {
	plainPassword: string;
}
