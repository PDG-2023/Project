export const INVENTORY_SINGLE_API_ENTRYPOINT = "/inventory";

/**
 * @param inventory the single inventory
 * @returns the endpoint for the given inventory
 */
export function inventorySingleEntrypoint(inventory: number) {
	return `${INVENTORY_SINGLE_API_ENTRYPOINT}/${inventory}`;
}
