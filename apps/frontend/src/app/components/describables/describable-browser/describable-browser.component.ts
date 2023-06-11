import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslateModule } from "@ngx-translate/core";
import { debounceTime, distinctUntilChanged, tap } from "rxjs";

import { LoadState } from "../../../../_lib/load-state";
import { sleep } from "../../../../_lib/utils";
import { FoundAndTotal } from "../../../../api/_lib/entity-api";
import { DescribableDto } from "../../../../api/_lib/entity-api/dtos";
import { SubscribableComponent } from "../../_lib/subscribable.component";
import { DescribablePreviewComponent } from "../describable-preview/describable-preview.component";

export interface DescribableBrowserLoaderParams {
	/**
	 * The discrete offset deducted from the page and the size
	 */
	offset: number;
	/**
	 * The current page
	 */
	page: number;
	/**
	 * The value of the search
	 */
	search: string;
	/**
	 * Size of a page
	 */
	size: number;
}

export interface DescribableWithMeta<T> {
	canRemove?: boolean;
	data: T;
	hasChildren?: boolean;
	hrefEdit: string;
	hrefShow: string;
}

@Component({
	selector: "app-describable-browser",
	standalone: true,
	styleUrls: ["./describable-browser.component.scss"],
	templateUrl: "./describable-browser.component.html",

	imports: [
		CommonModule,
		DescribablePreviewComponent,
		MatPaginatorModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		TranslateModule,
		ReactiveFormsModule,
		MatProgressBarModule
	]
})
export class DescribableBrowserComponent<T extends DescribableDto = DescribableDto>
	extends SubscribableComponent
	implements OnInit
{
	@Input()
	public loader!: (
		params: DescribableBrowserLoaderParams
	) => FoundAndTotal<DescribableWithMeta<T>> | Promise<FoundAndTotal<DescribableWithMeta<T>>>;

	/**
	 * Max size of a page (this does not force the data to 10).
	 * 0 = first page
	 */
	@Input()
	public initialPage = 0;
	/**
	 * Max size of a page (this does not force the data to 10)
	 */
	@Input()
	public initialSize = 10;
	/**
	 * Max size of a page (this does not force the data to 10)
	 */
	@Input()
	public initialSearch = "";

	@Output()
	public readonly remove = new EventEmitter<T>();
	@Output()
	public readonly expandedChange = new EventEmitter<{ expanded: boolean; item: T }>();

	protected readonly pageOptions = [5, 10, 25, 50];
	protected readonly dataState: LoadState<FoundAndTotal<DescribableWithMeta<T>>> = {
		error: false,
		loading: true
	};

	protected searching = false;
	protected readonly searchControl = new FormControl<string>("", { nonNullable: true });

	@ViewChild(MatPaginator)
	private readonly paginator!: MatPaginator;

	/**
	 * @returns the data at the moment
	 */
	public get data() {
		return this.dataState.data?.data;
	}

	public async ngOnInit() {
		this.searchControl.setValue(this.initialSearch);

		this.addSubscriptions(
			this.searchControl.valueChanges
				.pipe(
					tap(() => (this.searching = true)),
					debounceTime(500),
					distinctUntilChanged(),
					tap(() => (this.searching = false))
				)
				.subscribe(
					search =>
						void this.loadData({
							page: (this.paginator.pageIndex = 0),
							search,
							size: this.paginator.pageSize
						})
				)
		);

		await this.loadData({
			page: this.initialPage,
			search: this.initialSearch,
			size: this.initialSize
		});
	}

	/**
	 * Re-load data
	 * @returns a promise when the data is loaded
	 */
	public refresh() {
		return this.loadData({
			page: this.paginator.pageIndex,
			search: this.searchControl.value,
			size: this.paginator.pageSize
		});
	}

	protected handlePageChange(pageEvent: PageEvent) {
		return this.loadData({
			page: pageEvent.pageIndex,
			search: this.searchControl.value,
			size: pageEvent.pageSize
		});
	}

	private async loadData(params: Omit<DescribableBrowserLoaderParams, "offset">) {
		this.dataState.loading = true;
		this.dataState.error = false;

		try {
			const { page, size } = params;

			// just for the animation
			await sleep(250);
			this.dataState.data = await this.loader({
				...params,
				offset: page * size
			});
		} catch (error) {
			this.dataState.error = error as HttpErrorResponse;
		}

		this.dataState.loading = false;
	}
}
