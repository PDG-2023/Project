import { CategoryDto } from "../../../src/api/category-api/dtos";
import { InventoryDto } from "../../../src/api/inventory-api/dtos";
import { ItemDto } from "../../../src/api/item-api/dtos";
import { ItemModelDto } from "../../../src/api/item-model-api/dtos";
import { LocationDto } from "../../../src/api/location-api/dtos";
import { MovementDto } from "../../../src/api/movement-api/dtos";
import { UserDto } from "../../../src/api/user-api/dtos";

export interface DbSample {
	categories: CategoryDto[];
	inventories: InventoryDto[];
	items: ItemDto[];
	"items-models": ItemModelDto[];
	locations: LocationDto[];
	movements: MovementDto[];
	users: UserDto[];
}
