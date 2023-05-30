import { EntityHttpHandler } from "./_lib/entity.http-handler";
import { INVENTORY_API_ENDPOINT } from "../../../../src/api/inventory-api";
import { InventoryDto as Dto } from "../../../../src/api/inventory-api/dtos";

export class InventoryHttpHandler extends EntityHttpHandler<Dto> {
	protected override getEntryPoint(): string {
		return INVENTORY_API_ENDPOINT;
	}

	protected verifyCreate(data: unknown) {
		if (!data) {
			return 400;
		}

		return data as Dto;
	}

	protected verifyUpdate(data: unknown, stored: Dto) {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
