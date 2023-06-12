import { EntityDto } from "../../_lib/entity-api/dtos";

export interface UserDto extends EntityDto {
	email: string;
	firstName: string;
	lastName: string;
	/**
	 *inventory relations
	 */
	ownedInventories: number[];
	/**
	 *inventory relations
	 */
	sharedInventories: number[];
	/**
	 * Not used currently
	 */
	username: string;
}
