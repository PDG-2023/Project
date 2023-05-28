import { Injectable } from "@angular/core";

import { EntityDto } from "./dtos";
import { ApiClient } from "../../api.client";

@Injectable({
	providedIn: "root"
})
export abstract class EntityApiService<T extends EntityDto, ToCreate, ToUpdate> {
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
	public findAndCount(query?: unknown): Promise<unknown> {
		return Promise.reject(new Error("Not implemented yet"));
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
	public replace(id: number, body: ToUpdate): Promise<T> {
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
}
