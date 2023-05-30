import { HttpRequest, HttpResponseBase } from "@angular/common/http";

export const enum HTTP_METHOD {
	DELETE = "DELETE",
	// TODO: put elsewhere? Can be useful anywhere
	GET = "GET",
	PATCH = "PATCH",
	POST = "POST",
	PUT = "PUT"
}

export interface HttpHandlerTestParams {
	fullUri: string;
	uri: string;
	// TODO: params
}

export interface HttpHandlerTest {
	/**
	 * @returns Can this handler handle the uri?
	 */
	canHandle(uri: string): boolean;

	/**
	 * Make this handler handle a request
	 */
	handle(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase;
}
