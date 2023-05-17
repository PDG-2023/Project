export interface EntityDto {
	// Date format
	created: string;
	id: number;
	// Date format
	updated: string;
}

export type EntityDtoKeys = keyof EntityDto;
