import { Injectable } from "@angular/core";

import { UserCreateDto, UserDto, UserUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";

export const USER_API_ENDPOINT = "/users";

@Injectable({
	providedIn: "root"
})
export class UserApiService extends EntityApiService<UserDto, UserCreateDto, UserUpdateDto> {
	public override getEntrypoint(): string {
		return USER_API_ENDPOINT;
	}

	/**
	 * @returns the connected user
	 */
	public getCurrent(): Promise<UserDto> {
		// Authorization setting is done elsewhere
		return this.client.get(`${this.getEntrypoint()}/current-user`);
	}
}
