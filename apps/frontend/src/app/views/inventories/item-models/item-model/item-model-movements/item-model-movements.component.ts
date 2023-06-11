import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { debounceTime, distinctUntilChanged, tap } from "rxjs";

import { LoadState } from "../../../../../../_lib/load-state";
import { FoundAndTotal } from "../../../../../../api/_lib/entity-api";
import { InventoryDto } from "../../../../../../api/inventory-api/dtos";
import { ItemApiService } from "../../../../../../api/item-api";
import { ItemModelDto } from "../../../../../../api/item-model-api/dtos";
import { LocationApiService } from "../../../../../../api/location-api";
import { LocationDto } from "../../../../../../api/location-api/dtos";
import { MovementApiService } from "../../../../../../api/movement-api";
import { MovementDto } from "../../../../../../api/movement-api/dtos";
import { SubscribableComponent } from "../../../../../components/_lib/subscribable.component";
import { LocationsView } from "../../../locations/locations.view";

@Component({
	selector: "app-item-model-movements",
	styleUrls: ["./item-model-movements.component.scss"],
	templateUrl: "./item-model-movements.component.html"
})
export class ItemModelMovementsComponent extends SubscribableComponent implements OnInit {
	@Input()
	public inventory!: InventoryDto;

	@Input()
	public itemModel!: ItemModelDto;

	protected readonly LocationsView = LocationsView;

	protected readonly pageOptions = [5, 10, 25, 50];
	protected readonly initialPageSize = this.pageOptions[2];

	protected readonly locationsMap = new Map<number, LocationDto>();

	protected searchLocationSelected: LocationDto | null = null;
	protected readonly searchLocationState: LoadState<LocationDto[]> = {
		error: false,
		loading: false
	};
	protected readonly searchLocationControl = new FormControl("");

	protected movementsState: LoadState<FoundAndTotal<MovementDto>> = {
		error: false,
		loading: false
	};

	@ViewChild(MatPaginator, { static: true })
	private readonly paginator!: MatPaginator;

	public constructor(
		private readonly locationApi: LocationApiService,
		private readonly itemApi: ItemApiService,
		private readonly movementApi: MovementApiService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.searchLocationControl.valueChanges
				.pipe(
					tap(() => {
						this.searchLocationSelected = null;
						this.searchLocationState.loading = true;
					}),
					debounceTime(250),
					distinctUntilChanged()
				)
				.subscribe(search => {
					void this.searchLocation(search ?? "");
				})
		);

		void this.loadMovements({ length: 0, pageIndex: 0, pageSize: this.initialPageSize });
	}

	protected addMovement() {
		const locationId = this.searchLocationSelected?.id;
		if (!locationId) {
			return Promise.resolve();
		}

		return this.itemApi
			.create({ modelId: this.itemModel.id })
			.then(created =>
				this.movementApi.create({
					itemId: created.id,
					locationId: locationId,
					movementType: "IN"
				})
			)
			.then(() => {
				this.searchLocationSelected = null;
				this.searchLocationControl.setValue("");
				this.searchLocationControl.reset();

				return this.refreshMovements({ pageIndex: 0 });
			});
	}

	protected displayLocation(location: LocationDto) {
		return location.name;
	}

	protected loadMovements(pageEvent: PageEvent) {
		const { pageIndex, pageSize } = pageEvent;
		const offset = pageSize * pageIndex;

		this.movementsState.loading = true;
		return this.movementApi
			.findAndCount({
				limit: pageSize,
				offset,
				order: [{ direction: "desc", property: "created" }],
				where: { item: { model: { id: { $eq: this.itemModel.id } } } }
			})
			.then(async data => {
				this.movementsState.data = data;

				const locationIds = new Set(data.data.map(({ locationId }) => locationId));
				await Promise.all(
					Array.from(locationIds).map(id => this.locationApi.findById(id))
				).then(locations => {
					for (const location of locations) {
						this.locationsMap.set(location.id, location);
					}
				});
			})
			.catch(e => (this.movementsState.error = e as HttpErrorResponse))
			.finally(() => (this.movementsState.loading = false));
	}

	protected toggleMovement(movement: MovementDto) {
		if (movement.movementType !== "IN") {
			return;
		}

		return this.movementApi
			.create({
				...movement,
				movementType: "OUT"
			})
			.then(() => this.movementApi.delete(movement.id))
			.then(() => this.refreshMovements());
	}

	private refreshMovements(pageEvent: Partial<PageEvent> = {}) {
		return this.loadMovements({
			length: this.paginator.length,
			pageIndex: this.paginator.pageIndex,
			pageSize: this.paginator.pageSize,
			...pageEvent
		});
	}

	private searchLocation(search: string) {
		this.searchLocationState.error = false;
		this.searchLocationState.loading = true;

		return this.locationApi
			.findAndCountByInventory(this.inventory.id, {
				where: { name: { $like: `%${search}%` } }
			})
			.then(data => {
				this.searchLocationState.data = data.data;
			})
			.catch(e => (this.searchLocationState.error = e as HttpErrorResponse))
			.finally(() => (this.searchLocationState.loading = false));
	}
}
