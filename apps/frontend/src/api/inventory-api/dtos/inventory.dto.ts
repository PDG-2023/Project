import { EntityDto } from "../../_lib/entity-api/dtos";

export interface InventoryDto extends EntityDto {
	name: string;
	owner_id: number;

	/**
	 * Users having access to this inventory
	 */
	users: number[];
}
