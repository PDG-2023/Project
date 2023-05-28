import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

import { AuthApiService } from "../../api/auth-api";
import { AuthLoginDto } from "../../api/auth-api/dtos";
import { UserDto } from "../../api/user-api/dtos";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	protected readonly userConnected = new BehaviorSubject<{ token: string; user: UserDto } | null>(
		null
	);

	public constructor(private readonly service: AuthApiService) {}

	public getUserConnected(): Observable<UserDto | null> {
		return this.userConnected.pipe(map(value => value?.user ?? null));
	}

	/**
	 * Do the process and update the connected user instance
	 * @param body the login data
	 * @returns the connected user on success
	 */
	public login(body: AuthLoginDto): Promise<UserDto> {
		return this.service.getToken(body).then(({ token }) => {
			// TODO: get connected user

			throw new Error("Not implemented yet");
		});
	}

	/**
	 * @returns if the given credentials data are valid
	 */
	public async isValid(): Promise<boolean> {
		const connected = this.userConnected.value;
		if (!connected) {
			return false;
		}

		return this.service
			.validateToken(connected.token)
			.then(() => true)
			.catch((error: unknown) => {
				if (error instanceof HttpErrorResponse && error.status === 401) {
					this.invalidUser();
					return false;
				}

				throw error;
			});
	}

	public invalidUser() {
		this.userConnected.next(null);
	}
}
