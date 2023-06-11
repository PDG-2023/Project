import { LocationDto } from "./location.dto";

export interface LocationRelationsDto extends LocationDto {
	/**
	 * Can not exist
	 */
	parent: LocationRelationsDto;
}
