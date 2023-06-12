import { Injectable } from "@angular/core";

import { UserCreateDto, UserDto, UserUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";
import { RequestOptions } from "../api.client";
import { AuthApiService } from "../auth-api";

export const USER_API_ENDPOINT = "/users";

@Injectable({
	providedIn: "root"
})
export class UserApiService extends EntityApiService<UserDto, UserCreateDto, UserUpdateDto> {
	public override getEntrypoint(): string {
		return USER_API_ENDPOINT;
	}

	/**
	 * @param token token for the current user
	 * @returns the connected user
	 */
	public getCurrent(token?: string): Promise<UserDto> {
		const headers: RequestOptions["headers"] = token
			? { [AuthApiService.AUTH_HEADER]: AuthApiService.authHeaderToken(token) }
			: {};

		return this.client.get(`${this.getEntrypoint()}/current-user`, { headers });
	}
}
