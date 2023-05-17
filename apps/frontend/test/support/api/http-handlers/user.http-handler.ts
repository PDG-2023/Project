import { EntityHttpHandler } from "./_lib/entity.http-handler";
import { USER_API_ENDPOINT } from "../../../../src/api/user-api";
import { UserDto as Dto } from "../../../../src/api/user-api/dtos";

export class UserHttpHandler extends EntityHttpHandler<Dto> {
	protected override getEntryPoint(): string {
		return USER_API_ENDPOINT;
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
