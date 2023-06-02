import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { LocationApiService } from "../../../../../api/location-api";
import { LocationDto } from "../../../../../api/location-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import { RouteParam } from "../../../_lib/utils";
import { LocationsView } from "../locations.view";

type PathParam = "location";

@Component({
	styleUrls: ["./location.view.scss"],
	templateUrl: "./location.view.html"
})
export class LocationView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM: PathParam = "location";

	public static get ROUTE_PATH_PARAM(): RouteParam<PathParam> {
		return `:${LocationView.PATH_PARAM}`;
	}

	/**
	 * @param inventory The current inventory
	 * @param location The location to see
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, location: number): string {
		return `${LocationsView.getPath(inventory)}/${location}`;
	}

	protected data?: LocationDto;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly locationApi: LocationApiService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.activatedRoute.params.subscribe(params => {
				void this.locationApi
					.findById(+params[LocationView.PATH_PARAM])
					.then(value => (this.data = value));
			})
		);
	}
}
