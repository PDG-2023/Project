import { UserCreateDto } from "./user.create.dto";

// TODO
export type UserUpdateDto = Omit<UserCreateDto, "plainPassword"> &
	Partial<Pick<UserCreateDto, "plainPassword">>;
