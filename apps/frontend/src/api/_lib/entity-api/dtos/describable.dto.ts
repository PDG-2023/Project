import { EntityDto } from "./entity.dto";

/**
 * A `DescribableDto` is an entity with some description on it
 */
export interface DescribableDto extends EntityDto {
	description: string;
	name: string;
}
