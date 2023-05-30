import { MovementDto } from "./movement.dto";
import { EntityDtoKeys } from "../../_lib/entity-api/dtos";

// TODO
export type MovementCreateDto = Partial<Omit<MovementDto, EntityDtoKeys>>;
