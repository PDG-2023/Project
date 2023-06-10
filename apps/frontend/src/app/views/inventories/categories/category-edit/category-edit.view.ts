import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CategoryApiService } from "../../../../../api/category-api";
import { CategoryDto } from "../../../../../api/category-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import { CategoriesView } from "../categories.view";

type PathParam = "category";

@Component({
	styleUrls: ["./category-edit.view.scss"],
	templateUrl: "./category-edit.view.html"
})
export class CategoryEditView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM: PathParam = "category";

	public static get ROUTE_PATH_PARAM() {
		return `:${CategoryEditView.PATH_PARAM}/edit`;
	}

	/**
	 * @param inventory The current inventory
	 * @param category The category to edit
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, category: number): string {
		return `${CategoriesView.getPathForOne(inventory, category)}/edit`;
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
					.findById(+params[CategoryEditView.PATH_PARAM])
					.then(value => (this.data = value));
			})
		);
	}
}
