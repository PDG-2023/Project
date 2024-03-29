/**
 * Primitives of the APi
 */
export type EntityPrimitif = number | string | null;

export interface FoundAndTotal<T> {
	data: T[];
	total: number;
}

export type EntityOrderValues = "asc" | "desc";

/**
 * Return the keys that can be ordered
 */
export type EntityOrderableKeys<T> = keyof {
	// nested and relation can not be used to order
	[P in keyof T as T[P] extends EntityPrimitif ? P : never]: 0;
};

export interface EntityOrder<T> {
	direction: EntityOrderValues;
	property: EntityOrderableKeys<T>;
}

export interface EntityOperator<T> {
	$eq?: T | null;
	$ge?: T;
	$gt?: T;
	$like?: T;
	$lt?: T;
	$lte?: T;
	$neq?: T | null;
}

export type EntityFilter<T> = {
	[P in keyof T]?: NonNullable<T[P]> extends EntityPrimitif
		? // Primitive value -> Operator
		  EntityOperator<T[P]>
		: NonNullable<T[P]> extends Array<infer U>
		? // Array of something -> Flatten
		  EntityFilter<U>
		: NonNullable<T[P]> extends object
		? // Nested object (such as another entity) -> reapply filter on it
		  EntityFilter<T[P]>
		: // unknown
		  never;
};

export interface EntityPagination {
	/**
	 * Limit the number of entities returned.
	 *
	 * Use `0` to count only.
	 */
	limit: number;
	/**
	 * Skip some entities
	 */
	offset: number;
}

export interface EntityFindModifier<T, Q extends T = T> {
	/**
	 * Order the entities.
	 *
	 * The order of the array defines the ordering.
	 * (it is transform when making the request)
	 */
	order?: Array<EntityOrder<T>>;
	/**
	 * Filter the entities
	 */
	where?: EntityFilter<Q>;
}

export type EntityFindQuery<T, Q extends T = T> = EntityFindModifier<T, Q> &
	// If we set `limit` or `offset`, the other must be set too
	(EntityPagination | Partial<Record<keyof EntityPagination, never>>);
