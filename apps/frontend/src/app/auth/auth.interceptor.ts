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

import { AuthService, TokenStored } from "./auth.service";
import { AuthApiService } from "../../api/auth-api";
import { LoginView, LoginViewQuery } from "../views/login/login.view";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private token: TokenStored | null = null;

	public constructor(private readonly service: AuthService, private readonly router: Router) {
		// No need to unsubscribe, the interceptor is never destroyed
		this.service.token$.subscribe(token => (this.token = token));
	}

	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		if (this.token && !request.headers.get(AuthApiService.AUTH_HEADER)) {
			request = request.clone({
				setHeaders: {
					[AuthApiService.AUTH_HEADER]: AuthApiService.authHeaderToken(this.token.value)
				}
			});
		}

		return next.handle(request).pipe(
			catchError(error => {
				// No user is connected
				if (error instanceof HttpErrorResponse && error.status === 401) {
					this.service.invalidUser();

					const redirect = window.location.pathname;
					void this.router.navigate([LoginView.PATH_LOGIN], {
						queryParams: {
							// redirect: window.location.pathname
							redirect: redirect === "/" ? undefined : redirect
						} satisfies LoginViewQuery
					});
				}

				return throwError(error);
			})
		);
	}
}
