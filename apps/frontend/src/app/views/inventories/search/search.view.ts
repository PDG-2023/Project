import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { debounceTime, distinctUntilChanged, Observable, tap } from "rxjs";

import { LoadState } from "../../../../_lib/load-state";
import { InventorySearchResults } from "../../../../api/inventory-api";
import { InventoryDto, InventorySearchEntityType } from "../../../../api/inventory-api/dtos";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";

export interface SearchViewQuery {
	text?: string;
}

interface ResultTab {
	href: string | false;
	label: Observable<string>;
	type: InventorySearchEntityType;
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

	protected readonly searchState: LoadState<InventorySearchResults> = {
		error: false,
		loading: false
	};

	protected readonly resultTabs: ResultTab[];

	public constructor(
		private inventoryService: InventoryService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly translateService: TranslateService
	) {
		super();

		this.resultTabs = [
			{
				// TODO
				href: "",
				label: translateService.stream(
					"entities.location.__meta.names"
				) as Observable<string>,
				type: "location"
			},
			{
				href: "",
				label: translateService.stream(
					"entities.item-model.__meta.names"
				) as Observable<string>,
				type: "itemModel"
			},
			{
				href: false,
				label: translateService.stream("entities.user.__meta.names") as Observable<string>,
				type: "user"
			}
		];
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.inventoryService.inventoryExiting$.subscribe(
				inventory => (this.inventory = inventory)
			),
			this.searchControl.valueChanges
				.pipe(
					tap(() => (this.searchState.loading = true)),
					debounceTime(350),
					distinctUntilChanged()
				)
				.subscribe(() => {
					void this.handleSearch();
				})
		);

		const { text } = this.activatedRoute.snapshot.queryParams as SearchViewQuery;
		if (text) {
			this.searchControl.setValue(text);
		}
	}

	protected clearSearch() {
		this.searchControl.setValue("");
	}

	protected async handleSearch() {
		const { value } = this.searchControl;
		void this.router.navigate([], {
			queryParams: value ? ({ text: value } satisfies SearchViewQuery) : {},
			replaceUrl: true
		});

		if (!value) {
			return;
		}

		this.searchState.loading = true;
		return this.inventoryService.api
			.search(this.inventory.id, value)
			.then(results => (this.searchState.data = results))
			.catch(e => (this.searchState.error = e as HttpErrorResponse))
			.finally(() => (this.searchState.loading = false));
	}
}
