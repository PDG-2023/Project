import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, Observable } from "rxjs";

import { AuthApiService } from "../../api/auth-api";
import { AuthLoginDto } from "../../api/auth-api/dtos";
import { UserApiService } from "../../api/user-api";
import { UserCreateDto, UserDto } from "../../api/user-api/dtos";

export interface TokenStored {
	date: Date;
	value: string;
}

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private readonly user = new BehaviorSubject<UserDto | null>(null);
	private readonly token = new BehaviorSubject<TokenStored | null>(null);

	/**
	 * @returns an observable of the connected user or null
	 */
	public get user$(): Observable<UserDto | null> {
		return this.user.asObservable();
	}

	/**
	 * @returns an observable of the ("last") connected user
	 */
	public get userConnected$() {
		return this.user$.pipe(
			filter((user => !!user) as (value: UserDto | null) => value is UserDto)
		);
	}

	public get token$() {
		return this.token.asObservable();
	}

	/**
	 * @returns an observable of a boolean if the user is connected
	 */
	public get isUserConnected$() {
		return this.user$.pipe(map(user => !!user));
	}

	public constructor(
		private readonly authApi: AuthApiService,
		private readonly userApi: UserApiService
	) {}

	/**
	 * Create the user and login
	 * @param body to create the user
	 * @returns the connected user on success
	 */
	public create(body: UserCreateDto): Promise<UserDto> {
		return this.userApi
			.create({ username: body.email, ...body })
			.then(() => this.login({ password: body.plainPassword, username: body.email }));
	}

	/**
	 * Do the process and update the connected user instance
	 * @param body the login data
	 * @returns the connected user on success
	 */
	public login(body: AuthLoginDto): Promise<UserDto> {
		return this.authApi.getToken(body).then(({ token }) =>
			this.userApi.getCurrent(token).then(connected => {
				this.token.next({ date: new Date(), value: token });

				this.user.next(connected);
				return connected;
			})
		);
	}

	/**
	 * @returns if the given credentials data are valid
	 */
	public async isValid(): Promise<boolean> {
		const { value } = this.token;
		if (!value) {
			return false;
		}

		return this.authApi
			.validateToken(value.value)
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
		this.user.next(null);
	}
}
