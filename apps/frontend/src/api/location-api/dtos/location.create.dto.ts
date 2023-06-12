import { LocationDto } from "./location.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type LocationCreateDto = Partial<Omit<LocationDto, EntityDtoKeys>>;
