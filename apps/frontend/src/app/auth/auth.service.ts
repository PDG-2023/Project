import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, Observable } from "rxjs";
import { Jsonify } from "type-fest";

import { AuthApiService } from "../../api/auth-api";
import { AuthLoginDto } from "../../api/auth-api/dtos";
import { UserApiService } from "../../api/user-api";
import { UserCreateDto, UserDto } from "../../api/user-api/dtos";

export interface TokenStored {
	/**
	 * Store the date to know when the token was generated
	 */
	date: Date;
	value: string;
}

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private readonly user = new BehaviorSubject<UserDto | null>(null);
	private readonly token = new BehaviorSubject<TokenStored | null>(null);

	private _initialized = false;

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

	public invalidUser() {
		this.user.next(null);
		this.token.next(null);
	}

	/**
	 * To be called on application initialisation.
	 * Will determine if a token is already stored and log the user.
	 */
	public async _init() {
		if (this._initialized) {
			return;
		}

		this._initialized = true;

		const LOCAL_STORAGE_KEY = "store-me_auth";

		const storedRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedRaw) {
			const stored = (JSON.parse(storedRaw) ?? {}) as Partial<Jsonify<TokenStored>>;
			const { value } = stored;
			if (value && (await this.isValid(value))) {
				// TODO: use also date to validate?
				this.token.next({ date: new Date(), value });
				await this.userApi.getCurrent(value).then(connected => this.user.next(connected));
			}
		}

		// No need to unsubscribe, services are never destroyed (at the end to avoid to set null, before reading)
		this.token$.subscribe(token =>
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token ?? {}))
		);
	}

	/**
	 * @param token to validate
	 * @returns if the given credentials data are valid
	 */
	private async isValid(token: string): Promise<boolean> {
		return this.authApi
			.validateToken(token)
			.then(() => true)
			.catch((error: unknown) => {
				if (error instanceof HttpErrorResponse && error.status === 401) {
					return false;
				}

				throw error;
			});
	}
}
