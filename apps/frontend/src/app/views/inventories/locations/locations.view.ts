import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";

import { LocationEditView } from "./location-edit/location-edit.view";
import { LoadState } from "../../../../_lib/load-state";
import { FoundAndTotal } from "../../../../api/_lib/entity-api";
import { InventoryDto } from "../../../../api/inventory-api/dtos";
import { ItemModelApiService } from "../../../../api/item-model-api";
import { ItemModelDto } from "../../../../api/item-model-api/dtos";
import { LocationApiService } from "../../../../api/location-api";
import { LocationDto } from "../../../../api/location-api/dtos";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import {
	DescribableBrowserComponent,
	DescribableBrowserLoaderParams,
	DescribableWithMeta
} from "../../../components/describables/describable-browser/describable-browser.component";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../components/dialogs/confirm/confirm.dialog";
import { InventoryService } from "../../../inventory/inventory.service";
import { InventoryView } from "../inventory/inventory.view";
import { ItemModelView } from "../item-models/item-model/item-model.view";
import { ItemModelEditView } from "../item-models/item-model-edit/item-model-edit.view";

@Component({
	styleUrls: ["./locations.view.scss"],
	templateUrl: "./locations.view.html"
})
export class LocationsView extends SubscribableComponent implements OnInit {
	/**
	 * The path for the routes configuration
	 */
	public static readonly ROUTE_PATH = "locations";

	private static readonly PATH_FOR_ONE_PARAM = "location";

	public static get ROUTE_PATH_FOR_ONE() {
		return `:${this.PATH_FOR_ONE_PARAM}`;
	}

	/**
	 * @param inventory The current inventory
	 * @returns the path for this view
	 */
	public static getPath(inventory: number): string {
		return `${InventoryView.getPath(inventory)}/${this.ROUTE_PATH}`;
	}
	/**
	 * @param inventory The current inventory
	 * @param location The location to see
	 * @returns the path for this view
	 */
	public static getPathForOne(inventory: number, location: number): string {
		return `${this.getPath(inventory)}/${location}`;
	}

	protected inventory!: InventoryDto;

	/**
	 * null on root view
	 */
	protected locationState: LoadState<LocationDto> | null = null;
	protected parents: LocationDto[] = [];
	protected readonly addLocationNameControl = new FormControl("", {
		nonNullable: true,
		validators: [control => Validators.required(control)]
	});

	@ViewChild("browserItems")
	private browserItems?: DescribableBrowserComponent;
	@ViewChild("browserLocations")
	private browserLocations?: DescribableBrowserComponent;

	/**
	 * @returns the direct parent
	 */
	protected get parent(): LocationDto | null {
		return this.parents.length ? this.parents[this.parents.length - 1] : null;
	}

	protected get ROOT_PATH() {
		return LocationsView.getPath(this.inventory.id);
	}

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly inventoryService: InventoryService,
		private readonly locationApi: LocationApiService,
		private readonly itemModelApi: ItemModelApiService,
		private readonly matDialog: MatDialog,
		private readonly translateService: TranslateService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.inventoryService.inventoryExiting$.subscribe(
				inventory => (this.inventory = inventory)
			),
			// eslint-disable-next-line @typescript-eslint/no-misused-promises -- KIS
			this.activatedRoute.params.subscribe(async params => {
				const locId = params[LocationsView.PATH_FOR_ONE_PARAM] as string | undefined;
				if (locId && !Number.isNaN(+locId)) {
					const locationId = +locId;
					const state: LoadState<LocationDto> = (this.locationState = {
						error: false,
						loading: true
					});

					await this.locationApi
						.findById(locationId)
						.then(location => (state.data = location))
						.then(async location => {
							const parents = [];
							let child = location;

							while (child.parentLocationId) {
								const parent = await this.locationApi.findById(
									child.parentLocationId
								);
								parents.unshift(parent);
								child = parent;
							}

							this.parents = parents;
						})
						.catch(e => (state.error = e as HttpErrorResponse));

					state.loading = false;

					if (!state.error) {
						if (this.browserLocations) {
							void this.browserLocations.refresh();
						}

						if (this.browserItems) {
							void this.browserItems.refresh();
						}
					}
				} else {
					this.locationState = null;
				}
			})
		);
	}

	protected addNewLocation() {
		if (this.addLocationNameControl.invalid) {
			return;
		}

		void this.locationApi
			.createForInventory(this.inventory.id, {
				description: "",
				name: this.addLocationNameControl.value,
				parentLocationId: this.locationState?.data?.id ?? null
			})
			.then(location => this.router.navigate([this.getLocationHrefShow(location)]));
	}

	protected loadLocations(
		params: DescribableBrowserLoaderParams
	): Promise<FoundAndTotal<DescribableWithMeta<LocationDto>>> {
		const { offset, search, size } = params;

		return this.locationApi
			.findAndCountByInventory(this.inventory.id, {
				limit: size,
				offset,
				where: {
					name: { $like: `%${search}%` },
					parent: { id: { $eq: this.locationState?.data?.id ?? null } }
				}
			})
			.then(data => ({
				data: data.data.map<DescribableWithMeta<LocationDto>>(location => ({
					canRemove: !!this.locationState?.data?.id,
					data: location,
					hrefEdit: this.getLocationHrefEdit(location),
					hrefShow: this.getLocationHrefShow(location)
				})),
				total: data.total
			}))
			.then(data => {
				for (const location of data.data) {
					// async
					void this.locationApi
						.findAndCountByInventory(this.inventory.id, {
							limit: 0,
							offset: 0,
							where: { parent: { id: { $eq: location.data.id } } }
						})
						.then(({ total }) => (location.hasChildren = !!total));
				}

				return data;
			});
	}

	protected getLocationHrefShow(location: LocationDto) {
		return LocationsView.getPathForOne(this.inventory.id, location.id);
	}
	protected getLocationHrefEdit(location: LocationDto) {
		return LocationEditView.getPath(this.inventory.id, location.id);
	}

	protected handleLocationRemove(location: LocationDto) {
		const locationId = this.locationState?.data?.id;
		if (!locationId) {
			return Promise.resolve();
		}

		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.remove"),
						confirmColor: "warn",
						description: this.translateService.get(
							"views.locations.dialogs.remove-location.description"
						),
						title: this.translateService.get(
							"views.locations.dialogs.remove-location.title"
						)
					}
				})
				.afterClosed()
		).then(confirmed => {
			if (!confirmed) {
				return;
			}

			void this.locationApi
				.replace(location.id, {
					...location,
					parentLocationId: this.parent?.id ?? null
				})
				.then(() => this.browserLocations?.refresh());
		});
	}

	protected loadItems(
		params: DescribableBrowserLoaderParams
	): Promise<FoundAndTotal<DescribableWithMeta<ItemModelDto>>> {
		const locationId = this.locationState?.data?.id;
		if (!locationId) {
			return Promise.resolve({ data: [], total: 0 });
		}

		const { offset, search, size } = params;

		return this.itemModelApi
			.findAndCountByInventory(this.inventory.id, {
				limit: size,
				offset,
				where: {
					items: {
						movements: {
							location: { id: { $eq: locationId } },
							type: { $eq: "IN" }
						}
					},
					name: { $like: `%${search}%` }
				}
			})
			.then(data => ({
				data: data.data.map(item => ({
					canRemove: false,
					data: item,
					hrefEdit: ItemModelEditView.getPath(this.inventory.id, item.id),
					hrefShow: ItemModelView.getPath(this.inventory.id, item.id)
				})),
				total: data.total
			}));
	}
}
