import { Component } from "@angular/core";

import { DbBaseSample } from "../../../../../test/support/samples";
import { DescribableDto } from "../../../../api/_lib/entity-api/dtos";

interface LogEvent {
	data: unknown;
	date: Date;
}

interface LocationData {
	readonly expanded: boolean;
	readonly hasChildren: boolean;
	readonly location: DescribableDto;
	logs: {
		delete: LogEvent[];
		expanded: LogEvent[];
	};
}

@Component({
	styleUrls: ["./describable-preview.view.scss"],
	templateUrl: "./describable-preview.view.html"
})
export class DescribablePreviewView {
	protected readonly data: Array<{ data: LocationData[]; title: string }> = [
		{
			data: [
				{
					expanded: true,
					hasChildren: true,
					location: DbBaseSample.categories[0],
					logs: { delete: [], expanded: [] }
				},
				{
					expanded: false,
					hasChildren: false,
					location: DbBaseSample.categories[1],
					logs: { delete: [], expanded: [] }
				}
			],
			title: "Category"
		},
		{
			data: [
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
			],
			title: "Location"
		},
		{
			data: [
				{
					expanded: false,
					hasChildren: true,
					location: DbBaseSample["items-models"][0],
					logs: { delete: [], expanded: [] }
				},
				{
					expanded: false,
					hasChildren: false,
					location: DbBaseSample["items-models"][1],
					logs: { delete: [], expanded: [] }
				}
			],
			title: "Item-models"
		}
	];

	public addLogs(locationData: LocationData, key: keyof LocationData["logs"], data: unknown) {
		locationData.logs[key].unshift({ data, date: new Date() });
	}
}
