import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, Observable } from "rxjs";

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

	/**
	 * @returns an observable of the connected user or null
	 */
	public get user$(): Observable<UserDto | null> {
		return this.userConnected.pipe(map(value => value?.user ?? null));
	}

	/**
	 * @returns an observable of the ("last") connected user
	 */
	public get userConnected$() {
		return this.user$.pipe(
			filter((user => !!user) as (value: UserDto | null) => value is UserDto)
		);
	}

	/**
	 * @returns an observable of a boolean if the user is connected
	 */
	public get isUserConnected$() {
		return this.user$.pipe(map(user => !!user));
	}

	public constructor(private readonly service: AuthApiService) {}

	/**
	 * Do the process and update the connected user instance
	 * @param body the login data
	 * @returns the connected user on success
	 */
	public login(body: AuthLoginDto): Promise<UserDto> {
		if (body.username === "root@store.me") {
			// TODO: remove
			const [first, ...last] = body.password.split(" ");

			const user: UserDto = {
				id: 1,

				created: "",
				updated: "",

				email: body.username,
				firstName: first,
				lastName: last.join(" "),

				ownedInventories: [],
				sharedInventories: []
			};
			this.userConnected.next({ token: "--", user });

			return Promise.resolve(user);
		}

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
