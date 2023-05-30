import { CategoryDto } from "./category.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type CategoryCreateDto = Partial<Omit<CategoryDto, EntityDtoKeys>>;
