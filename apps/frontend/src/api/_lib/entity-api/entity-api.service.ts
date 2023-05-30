import { HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { stringify } from "qs";

import { EntityDto } from "./dtos";
import { entityFindQueryConvert } from "./entity-api.find-query.converter";
import { EntityFindQuery, FoundAndTotal } from "./entity-api.types";
import { ApiClient } from "../../api.client";

export interface FindAndCountParams {
	uri: string;
}

@Injectable({
	providedIn: "root"
})
export abstract class EntityApiService<
	T extends EntityDto,
	ToCreate,
	ToReplace,
	Q extends EntityFindQuery<T> = EntityFindQuery<T>
> {
	/**
	 * Header key where the total of items is stored
	 */
	public static HEADER_TOTAL = "TODO";

	public constructor(protected readonly client: ApiClient) {}

	/**
	 * Get the entrypoint from the api url.
	 *
	 * Given the api url 'http://localhost:3000/api',
	 * if the final url is 'http://localhost:3000/api/v2/bars', the entrypoint is '/v2/bars'
	 */
	public abstract getEntrypoint(): string;

	/**
	 * Finds entities with the given filter and order
	 * @param query Filter, sort and/or paginate the results
	 * @returns The results of the request
	 */
	public findAndCount(query?: Q): Promise<FoundAndTotal<T>> {
		return this._findAndCount({ uri: this.getEntrypoint() }, query);
	}

	/**
	 * Finds one entity.
	 * @param id Of the entity to find
	 * @returns The entity found
	 */
	public findById(id: number): Promise<T> {
		return this.client.get(`${this.getEntrypoint()}/${id}`);
	}

	/**
	 * Creates an entity.
	 * @param body Object to create an entity
	 * @returns the created entity
	 */
	public create(body: ToCreate): Promise<T> {
		return this.client.post(this.getEntrypoint(), body);
	}

	/**
	 * Updates an entity.
	 * @param id The id of the entity to update
	 * @param body Object to update an entity
	 * @returns the updated entity
	 */
	public replace(id: number, body: ToReplace): Promise<T> {
		return this.client.put(`${this.getEntrypoint()}/${id}`, body);
	}

	/**
	 * Deletes an entity.
	 * @param id The id of the entity to delete
	 * @throws An error when the element to delete is not found
	 * @returns The just deleted entity
	 */
	public delete(id: number): Promise<T> {
		return this.client.delete(`${this.getEntrypoint()}/${id}`);
	}

	/**
	 * Does 'find' request.
	 * The url can be different, but the filter are the same:
	 * ex: '/users' and '/group/1/users'
	 * @param params specific parameters
	 * @param query to request
	 * @returns the data found and its total
	 */
	protected _findAndCount<T2 = T, Q2 extends EntityFindQuery<T2> = EntityFindQuery<T2>>(
		params: FindAndCountParams,
		query?: Q2
	): Promise<FoundAndTotal<T2>> {
		let url = params.uri;

		if (query) {
			const queryString = stringify(entityFindQueryConvert(query));
			if (queryString) {
				url += `?${queryString}`;
			}
		}

		let total: number | undefined;
		return this.client
			.get<T2[]>(url, {
				observeEvent: event => {
					if (event.type !== HttpEventType.ResponseHeader) {
						return;
					}

					const header = event.headers.get(EntityApiService.HEADER_TOTAL);
					if (header) {
						total = Number.isNaN(+header) ? -1 : +header;
					}
				}
			})
			.then(data => ({ data, total: total ?? -1 }));
	}
}
