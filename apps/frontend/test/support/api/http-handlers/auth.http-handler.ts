import { HttpRequest, HttpResponse } from "@angular/common/http";

import {
	HTTP_METHOD,
	HttpHandlerTest,
	HttpHandlerTestParams
} from "./_lib/http-handler.test.interface";
import { AUTH_API_ENTRYPOINT, AuthApiService } from "../../../../src/api/auth-api";
import { AuthLoginDto, AuthTokenDto } from "../../../../src/api/auth-api/dtos";
import { UserDto } from "../../../../src/api/user-api/dtos";
import { DbBaseSample } from "../../samples";

export class AuthHttpHandler implements HttpHandlerTest {
	/**
	 * Token to user ID
	 */
	private readonly tokens = new Map<string, number>();
	private _id = 0;

	private readonly db = DbBaseSample.users;

	public canHandle(uri: string) {
		return uri.startsWith(AUTH_API_ENTRYPOINT);
	}

	public handle(params: HttpHandlerTestParams, request: HttpRequest<unknown>) {
		const { fullUri, uri } = params;

		if (request.method === HTTP_METHOD.POST.toString()) {
			const action = this.getUriAction(uri);

			switch (action) {
				case "/getToken":
					return this.handleLogin(request as never);
				case "/validateToken":
					return this.handleValidate(request);
			}
		}

		return new HttpResponse({
			body: null,
			status: 404,
			url: fullUri
		});
	}

	private generateToken(user: UserDto) {
		return `_tok_${++this._id}_${user.id}_`;
	}

	private getUriAction(uri: string) {
		return uri.substring(AUTH_API_ENTRYPOINT.length);
	}

	private handleLogin(request: HttpRequest<Partial<AuthLoginDto>>) {
		const { body, url } = request;

		if (body?.username && body.password) {
			const user = this.db.find(({ email }) => email === body.username);

			// On tests all correct passwords are `password`
			if (user && body.password === "password") {
				const token = this.generateToken(user);
				this.tokens.set(token, user.id);

				return new HttpResponse({
					body: { token } satisfies AuthTokenDto,
					status: 200,
					url
				});
			}

			return new HttpResponse({
				status: 401,
				url
			});
		}

		return new HttpResponse({
			status: 400,
			url
		});
	}

	private handleValidate(request: HttpRequest<unknown>) {
		const { headers, url } = request;

		return new HttpResponse({
			status: this.tokens.has(headers.get(AuthApiService.AUTH_HEADER) ?? "_1") ? 200 : 401,
			url
		});
	}
}
