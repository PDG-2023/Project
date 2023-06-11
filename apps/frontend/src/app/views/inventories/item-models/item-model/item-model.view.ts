import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ItemModelApiService } from "../../../../../api/item-model-api";
import { ItemModelDto } from "../../../../../api/item-model-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import { ItemModelsView } from "../item-models.view";

@Component({
	styleUrls: ["./item-model.view.scss"],
	templateUrl: "./item-model.view.html"
})
export class ItemModelView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM = "item-model";

	public static get ROUTE_PATH() {
		return `:${ItemModelView.PATH_PARAM}/edit`;
	}

	/**
	 * @param inventory The current inventory
	 * @param itemModel The location to see
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, itemModel: number): string {
		return `${ItemModelsView.getPath(inventory)}/${itemModel}`;
	}

	protected data?: ItemModelDto;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly itemModelApi: ItemModelApiService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.activatedRoute.params.subscribe(params => {
				void this.itemModelApi
					.findById(+params[ItemModelView.PATH_PARAM])
					.then(value => (this.data = value));
			})
		);
	}
}
