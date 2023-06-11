import { EntityDto } from "./dtos";
import { EntityFindQuery, EntityOrderableKeys, EntityOrderValues } from "./entity-api.types";

interface EntityFindQueryReal<T, Q extends T = T> extends Omit<EntityFindQuery<T, Q>, "order"> {
	order?: Partial<Record<EntityOrderableKeys<T>, EntityOrderValues>>;
}

/**
 * The `FindQuery` use by the services are not the real structure sent to the API.
 * This function converts the data to be sent to the API.
 * @param query The query to convert
 * @returns the real data to send to the API
 */
export function entityFindQueryConvert<T = never, Q extends T = T>(
	query: EntityFindQuery<T, Q>
): EntityFindQueryReal<T, Q> {
	const { order, ...rest } = query;

	if (order?.length) {
		return {
			...rest,
			// The `order` must be converted; the order of the properties matters
			order: order.reduce((realOrder, { direction, property }) => {
				const annoyingProperties = ["created", "updated"] satisfies Array<keyof EntityDto>;
				if (annoyingProperties.includes(property as never)) {
					// @ts-expect-error - TS2322: no longer a symbol
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- above
					property = `${property}At`;
				}

				if (property in realOrder) {
					return realOrder;
				}

				return {
					...realOrder,
					// Add the new property
					[property]: direction
				};
			}, {})
		};
	}

	// There is no order
	return rest;
}
