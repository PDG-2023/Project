import {
	HttpEvent,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Provider } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

import {
	AuthHttpHandler,
	InventoryHttpHandler,
	ItemHttpHandler,
	ItemModelHttpHandler,
	LocationHttpHandler,
	MovementHttpHandler,
	UserHttpHandler
} from "./http-handlers";
import { HttpHandlerTest } from "./http-handlers/_lib/http-handler.test.interface";
import { ApiClient } from "../../../src/api";
import { DbBaseSample } from "../samples";

const apiUrl = ApiClient.getURL();

export class ApiTestInterceptor implements HttpInterceptor {
	private readonly handlers: HttpHandlerTest[] = [
		new AuthHttpHandler(),
		new InventoryHttpHandler(DbBaseSample.inventories),
		new ItemModelHttpHandler(DbBaseSample["items-models"]),
		new ItemHttpHandler(DbBaseSample.items),
		new LocationHttpHandler(DbBaseSample.locations),
		new MovementHttpHandler(DbBaseSample.movements),
		new UserHttpHandler(DbBaseSample.users)
	];

	public intercept(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
		// TODO: add a random sleep? (simulates a response time)

		const fullUri = request.url.replace(apiUrl, "");

		const handler = this.handlers.find(handler => handler.canHandle(fullUri));
		if (handler) {
			let uri = fullUri;
			// let queryParams = ""; // TODO: convert to object

			{
				const paramPos = uri.indexOf("?");
				if (paramPos !== -1) {
					// queryParams = uri.substring(paramPos + 1);
					uri = uri.substring(0, paramPos);
				}
			}

			const response = handler.handle({ fullUri, uri }, request);
			return response.status >= 400
				? throwError(() => response)
				: of(response as HttpResponse<unknown>);
		}

		return throwError(
			() =>
				new HttpResponse({
					body: null,
					status: 404,
					url: fullUri
				})
		);
	}
}

export const ApiInterceptorTestProvider: Provider = {
	multi: true,
	provide: HTTP_INTERCEPTORS,
	useClass: ApiTestInterceptor
};
