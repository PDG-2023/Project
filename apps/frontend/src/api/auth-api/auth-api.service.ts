import { Injectable } from "@angular/core";

import { AuthLoginDto, AuthTokenDto } from "./dtos";
import { ApiClient } from "../api.client";

export const AUTH_API_ENTRYPOINT = "/authentication";

@Injectable({
	providedIn: "root"
})
export class AuthApiService {
	public static readonly AUTH_HEADER = "Authorization";

	public static authHeaderToken(token: string) {
		return `bearer ${token}`;
	}

	public constructor(private readonly client: ApiClient) {}

	/**
	 * @param body login
	 * @returns the credentials
	 */
	public getToken(body: AuthLoginDto): Promise<AuthTokenDto> {
		return this.client.post(`${AUTH_API_ENTRYPOINT}/getToken`, body);
	}

	public validateToken(token: string): Promise<boolean> {
		return this.client.post(`${AUTH_API_ENTRYPOINT}/validateToken`, undefined, {
			headers: { [AuthApiService.AUTH_HEADER]: AuthApiService.authHeaderToken(token) }
		});
	}
}
