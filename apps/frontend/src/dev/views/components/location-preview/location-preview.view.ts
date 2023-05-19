import { Component } from "@angular/core";

import { DbBaseSample } from "../../../../../test/support/samples";
import { LocationDto } from "../../../../api/location-api/dtos";

interface LogEvent {
	data: unknown;
	date: Date;
}

interface LocationData {
	readonly expanded: boolean;
	readonly hasChildren: boolean;
	readonly location: LocationDto;
	logs: {
		delete: LogEvent[];
		expanded: LogEvent[];
	};
}

@Component({
	styleUrls: ["./location-preview.view.scss"],
	templateUrl: "./location-preview.view.html"
})
export class LocationPreviewView {
	protected readonly locationData: LocationData[] = [
		{
			expanded: false,
			hasChildren: true,
			location: DbBaseSample.locations[0],
			logs: { delete: [], expanded: [] }
		},
		{
			expanded: true,
			hasChildren: false,
			location: DbBaseSample.locations[1],
			logs: { delete: [], expanded: [] }
		}
	];

	public addLogs(locationData: LocationData, key: keyof LocationData["logs"], data: unknown) {
		locationData.logs[key].unshift({ data, date: new Date() });
	}
}
