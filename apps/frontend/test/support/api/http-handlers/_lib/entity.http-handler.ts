import {
	HttpErrorResponse,
	HttpRequest,
	HttpResponse,
	HttpResponseBase
} from "@angular/common/http";

import { HttpHandlerTest, HttpHandlerTestParams, HTTP_METHOD } from "./http-handler.test.interface";
import { EntityDto } from "../../../../../src/api/_lib/entity-api/dtos";

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison, unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars -- Simple */

export abstract class EntityHttpHandler<T extends EntityDto> implements HttpHandlerTest {
	public constructor(protected readonly mocks: T[]) {}

	public canHandle(url: string): boolean {
		return url.startsWith(this.getEntryPoint());
	}

	public handle(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase {
		if (this.isAFindRequest(params, request)) {
			return this.handleFind(params, request);
		}

		if (this.isAGetRequest(params, request)) {
			return this.handleGet(params, request);
		}

		if (this.isACreateRequest(params, request)) {
			return this.handleCreate(params, request);
		}

		if (this.isAUpdateRequest(params, request)) {
			return this.handleUpdate(params, request);
		}

		if (this.isADeleteRequest(params, request)) {
			return this.handleDelete(params, request);
		}

		// TODO: find + delete

		return new HttpErrorResponse({
			status: 404,
			url: params.fullUri
		});
	}

	/**
	 * Verify data
	 * @returns the data to add to the "db" else the error status code
	 */
	protected abstract verifyCreate(data: unknown): T | number;
	/**
	 * Verify data
	 * @returns the data to update to the "db" else the error status code
	 */
	protected abstract verifyUpdate(data: unknown, stored: T): T | number;

	/**
	 * Verify that the data can be deleted (integrity constraints)
	 */
	protected abstract canDelete(data: T): boolean;

	protected abstract getEntryPoint(): string;

	/**
	 * @param params The HTTP params
	 * @returns the "action" of a generic model HTTP handler
	 */
	protected getAction(params: HttpHandlerTestParams) {
		return params.uri.substring(this.getEntryPoint().length);
	}

	/**
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns if the request is a "get" request
	 */
	protected isAFindRequest(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): boolean {
		// This is a bit redundant but keep the handler flexible
		return request.method === HTTP_METHOD.GET && params.uri === this.getEntryPoint();
	}

	/**
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns if the request is a "get" request
	 */
	protected isAGetRequest(params: HttpHandlerTestParams, request: HttpRequest<unknown>): boolean {
		// This is a bit redundant but keep the handler flexible
		return request.method === HTTP_METHOD.GET && !isNaN(+this.getAction(params).substring(1));
	}

	/**
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns Determine if the request is a "create" request
	 */
	protected isACreateRequest(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): boolean {
		return request.method === HTTP_METHOD.POST && !this.getAction(params).length;
	}

	/**
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns if the request is a "update" request
	 */
	protected isAUpdateRequest(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): boolean {
		// This is a bit redundant but keep the handler flexible
		return request.method === HTTP_METHOD.PATCH && !isNaN(+this.getAction(params).substring(1));
	}

	/**
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns if the request is a "delete" request
	 */
	protected isADeleteRequest(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): boolean {
		// This is a bit redundant but keep the handler flexible
		return (
			request.method === HTTP_METHOD.DELETE && !isNaN(+this.getAction(params).substring(1))
		);
	}

	protected handleFind(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): HttpResponseBase {
		const data = this.findData(params, request);

		throw new Error("Not implemented");
	}

	protected findData(params: HttpHandlerTestParams, request: HttpRequest<unknown>): T[] {
		// TODO: override in children

		return this.mocks;
	}

	/**
	 * Handle the "get" route
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns the response
	 */
	protected handleGet(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): HttpResponseBase {
		// request is keep for possible overrides
		const id = +this.getAction(params).substring(1);
		const data = this.mocks.find(_ => _.id === id);

		if (data) {
			return new HttpResponse({
				body: data,
				status: 200,
				url: params.fullUri
			});
		}

		return new HttpErrorResponse({
			status: 404,
			url: params.fullUri
		});
	}

	/**
	 * Handle the "create" route
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns the response
	 */
	protected handleCreate(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): HttpResponseBase {
		const created = this.verifyCreate(request.body) as T;
		if (+created) {
			return new HttpErrorResponse({
				status: +created,
				url: params.fullUri
			});
		}

		created.id = Math.max(...this.mocks.map(({ id }) => id)) + 1;
		this.mocks.push(created);

		return new HttpResponse({
			body: created,
			status: 201,
			url: params.fullUri
		});
	}

	/**
	 * Handle the "update" route
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns the response
	 */
	protected handleUpdate(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): HttpResponseBase {
		const id = +this.getAction(params).substring(1);
		const iData = this.mocks.findIndex(_ => _.id === id);
		const data = this.mocks[iData] as T | undefined;

		if (data) {
			const updated = this.verifyUpdate(request.body, data);

			if (+updated) {
				return new HttpErrorResponse({
					status: +updated,
					url: params.fullUri
				});
			}

			// TODO: a merge function
			this.mocks[iData] = updated as T;
			return new HttpResponse({
				body: updated,
				status: 201,
				url: params.fullUri
			});
		}

		return new HttpErrorResponse({
			status: 404,
			url: params.fullUri
		});
	}

	/**
	 * Handle the "delete" route
	 * @param params The HTTP params
	 * @param request The HTTP orignal request
	 * @returns the response
	 */
	protected handleDelete(
		params: HttpHandlerTestParams,
		request: HttpRequest<unknown>
	): HttpResponseBase {
		const id = +this.getAction(params).substring(1);
		const iData = this.mocks.findIndex(_ => _.id === id);

		if (iData < 0) {
			return new HttpErrorResponse({
				status: 404,
				url: params.fullUri
			});
		}

		if (!this.canDelete(this.mocks[iData])) {
			return new HttpErrorResponse({
				status: 400, // TODO: other?
				url: params.fullUri
			});
		}

		// TODO: this really removes the data in the array
		this.mocks.splice(iData);
		return new HttpResponse({
			body: undefined,
			status: 200,
			url: params.fullUri
		});
	}
}

/* eslint-enable */
