import { ItemDto } from "./item.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type ItemUpdateDto = Omit<ItemDto, EntityDtoKeys>;
