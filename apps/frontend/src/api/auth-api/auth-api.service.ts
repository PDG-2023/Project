import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { UserDto } from "../user-api/dtos";

export const AUTH_API_SERVICE = "/auth";

@Injectable({
	providedIn: "root"
})
export class AuthApiService {
	protected readonly userConnected = new BehaviorSubject<UserDto | null>(null);

	public getUserConnected(): Observable<UserDto | null> {
		return this.userConnected.asObservable();
	}
}
