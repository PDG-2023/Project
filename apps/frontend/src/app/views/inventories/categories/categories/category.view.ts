import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CategoryApiService } from "../../../../../api/category-api";
import { CategoryDto } from "../../../../../api/category-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import { RouteParam } from "../../../_lib/utils";
import { CategoriesView } from "../categories.view";

type PathParam = "category";

@Component({
	styleUrls: ["./category.view.scss"],
	templateUrl: "./category.view.html"
})
export class CategoryView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM: PathParam = "category";

	public static get ROUTE_PATH_PARAM(): RouteParam<PathParam> {
		return `:${CategoryView.PATH_PARAM}`;
	}

	/**
	 * @param inventory The current inventory
	 * @param location The location to see
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, location: number): string {
		return `${CategoriesView.getPath(inventory)}/${location}`;
	}

	protected data?: CategoryDto;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly categoryApi: CategoryApiService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.activatedRoute.params.subscribe(params => {
				void this.categoryApi
					.findById(+params[CategoryView.PATH_PARAM])
					.then(value => (this.data = value));
			})
		);
	}
}
