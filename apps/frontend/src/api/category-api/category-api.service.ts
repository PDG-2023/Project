import { Injectable } from "@angular/core";

import { CategoryCreateDto, CategoryDto, CategoryUpdateDto } from "./dtos";
import { EntityApiService } from "../_lib/entity-api";

export const CATEGORY_API_ENDPOINT = "/categories";

@Injectable({
	providedIn: "root"
})
export class CategoryApiService extends EntityApiService<
	CategoryDto,
	CategoryCreateDto,
	CategoryUpdateDto
> {
	public override getEntrypoint(): string {
		return CATEGORY_API_ENDPOINT;
	}
}
