import { UserDto } from "./user.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type UserCreateDto = Partial<Omit<UserDto, EntityDtoKeys>>;
