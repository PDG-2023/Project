import { ItemModelDto } from "./item-model.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type ItemModelUpdateDto = Omit<ItemModelDto, EntityDtoKeys>;
