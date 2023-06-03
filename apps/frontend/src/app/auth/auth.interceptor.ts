import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

import { AuthService } from "./auth.service";
import { LoginView, LoginViewQuery } from "../views/login/login.view";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private isConnected = false;
	public constructor(private readonly service: AuthService, private readonly router: Router) {
		// No need to unsubscribe, the interceptor is never destroyed
		this.service.isUserConnected$.subscribe(connected => (this.isConnected = connected));
	}

	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error, observer) => {
				if (
					error instanceof HttpErrorResponse &&
					error.status === 401 &&
					this.isConnected
				) {
					this.service.invalidUser();
					void this.router.navigate([LoginView.PATH_LOGIN], {
						queryParams: {
							redirect: this.router.routerState.snapshot.url
						} satisfies LoginViewQuery
					});
					return observer;
				}

				return throwError(error);
			})
		);
	}
}
