import { EntityHttpHandler } from "./_lib/entity.http-handler";
import { ITEM_API_ENDPOINT } from "../../../../src/api/item-api";
import { ItemDto as Dto } from "../../../../src/api/item-api/dtos";

export class ItemHttpHandler extends EntityHttpHandler<Dto> {
	protected override getEntryPoint(): string {
		return ITEM_API_ENDPOINT;
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
