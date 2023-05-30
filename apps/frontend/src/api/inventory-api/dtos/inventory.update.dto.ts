import { InventoryDto } from "./inventory.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type InventoryUpdateDto = Omit<InventoryDto, EntityDtoKeys>;
