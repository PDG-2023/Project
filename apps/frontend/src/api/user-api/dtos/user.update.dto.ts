import { UserDto } from "./user.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type UserUpdateDto = Omit<UserDto, EntityDtoKeys>;
