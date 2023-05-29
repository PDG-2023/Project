import { EntityDto } from "../../_lib/entity-api/dtos";

export interface InventoryDto extends EntityDto {
	name: string;

	/**
	 * Users having access to this inventory
	 */
	users: number[];
}
