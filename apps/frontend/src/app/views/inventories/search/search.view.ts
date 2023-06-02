import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, filter, tap } from "rxjs";

import { InventoryDto } from "../../../../api/inventory-api/dtos";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";

export interface SearchViewQuery {
	text?: string;
}

@Component({
	styleUrls: ["./search.view.scss"],
	templateUrl: "./search.view.html"
})
export class SearchView extends SubscribableComponent implements OnInit {
	public static readonly ROUTE_PATH = "search";

	/**
	 * @param inventory The current inventory
	 * @returns the search path for this view
	 */
	public static getPath(inventory: number): string {
		return `${InventoryView.getPath(inventory)}/${this.ROUTE_PATH}`;
	}

	protected readonly searchControl = new FormControl<string>("", { nonNullable: true });
	protected inventory!: InventoryDto;

	protected error: HttpErrorResponse | false = false;
	protected searching = false;
	protected data?: string;

	public constructor(
		private inventoryService: InventoryService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.inventoryService.inventoryExiting$.subscribe(
				inventory => (this.inventory = inventory)
			),
			this.searchControl.valueChanges
				.pipe(
					filter(value => !!value),
					tap(() => (this.searching = true)),
					debounceTime(750),
					distinctUntilChanged()
				)
				.subscribe(() => this.handleSearch())
		);

		const { text } = this.activatedRoute.snapshot.queryParams as SearchViewQuery;
		if (text) {
			this.searchControl.setValue(text);
		}
	}

	protected clearSearch() {
		this.searchControl.setValue("");
	}

	protected handleSearch() {
		const { value } = this.searchControl;
		if (!value) {
			return;
		}

		if (value.startsWith("error")) {
			// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- temporary
			this.error = { status: 500 } as HttpErrorResponse;
		} else {
			this.data = `${value}-${value}`;
			this.error = false;
		}

		this.searching = false;
		void this.router.navigate([], {
			queryParams: value ? ({ text: value } satisfies SearchViewQuery) : {},
			queryParamsHandling: "merge",
			replaceUrl: true
		});
	}
}
