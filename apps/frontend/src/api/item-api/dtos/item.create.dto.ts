import { ItemDto } from "./item.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type ItemCreateDto = Partial<Omit<ItemDto, EntityDtoKeys>>;
