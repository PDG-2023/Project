export type InventorySearchEntityType = "itemModel" | "location" | "user";

export interface InventorySearchResultDto {
	description: string;
	entityType: InventorySearchEntityType;
	id: number;
	name: string;
}
