import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";

import { LoadState } from "../../../../../_lib/load-state";
import { InventoryDto } from "../../../../../api/inventory-api/dtos";
import { LocationApiService } from "../../../../../api/location-api";
import { LocationDto } from "../../../../../api/location-api/dtos";
import { SubscribableComponent } from "../../../../components/_lib/subscribable.component";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../../components/dialogs/confirm/confirm.dialog";
import { InventoryService } from "../../../../inventory/inventory.service";
import { LocationsView } from "../locations.view";

@Component({
	styleUrls: ["./location-edit.view.scss"],
	templateUrl: "./location-edit.view.html"
})
export class LocationEditView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM = "location";

	public static get ROUTE_PATH() {
		return `:${LocationEditView.PATH_PARAM}/edit`;
	}

	/**
	 * @param inventory The current inventory
	 * @param location The location to see
	 * @returns the path for this view
	 */
	public static getPath(inventory: number, location: number): string {
		return `${LocationsView.getPath(inventory)}/${location}/edit`;
	}

	protected readonly LocationsView = LocationsView;

	protected inventory!: InventoryDto;

	protected locationState: LoadState<LocationDto> = { error: false, loading: false };
	protected parent: LocationDto | null = null;

	protected readonly locationForm = new FormGroup<
		Record<keyof Pick<LocationDto, "description" | "name">, FormControl<string>>
	>({
		description: new FormControl("", {
			nonNullable: true,
			validators: [control => Validators.required(control)]
		}),
		name: new FormControl("", {
			nonNullable: true,
			validators: [
				control => Validators.required(control),
				control => Validators.minLength(2)(control)
			]
		})
	});

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly inventoryService: InventoryService,
		private readonly locationApi: LocationApiService,
		private readonly matDialog: MatDialog,
		private readonly router: Router,
		private readonly translateService: TranslateService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.inventoryService.inventoryExiting$.subscribe(
				inventory => (this.inventory = inventory)
			),
			this.activatedRoute.params.subscribe(params => {
				// Even if it is not a number
				void this.loadLocation(+params[LocationEditView.PATH_PARAM]);
			})
		);
	}

	protected handleDelete(location: LocationDto) {
		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.delete"),
						confirmColor: "warn",
						description: this.translateService.get(
							"views.location-edit.dialogs.delete.description"
						),
						title: this.translateService.get("views.location-edit.dialogs.delete.title")
					}
				})
				.afterClosed()
		).then(confirmed => {
			if (!confirmed) {
				return;
			}
			void this.locationApi
				.delete(location.id)
				.then(() =>
					this.router.navigate([
						this.parent
							? LocationsView.getPathForOne(this.inventory.id, this.parent.id)
							: LocationsView.getPath(this.inventory.id)
					])
				);
		});
	}

	protected handleUpdate(location: LocationDto) {
		if (this.locationForm.invalid) {
			return;
		}

		const values = this.locationForm.getRawValue();
		return this.locationApi
			.replace(location.id, { ...location, ...values })
			.then(() => this.loadLocation(location.id));
	}

	private loadLocation(id: number) {
		this.locationState.error = false;
		this.locationState.loading = true;

		return this.locationApi
			.findById(id)
			.then(async location => {
				this.locationState.data = location;

				this.locationForm.setValue({
					description: location.description,
					name: location.name
				});

				this.parent = location.parentLocationId
					? await this.locationApi.findById(location.parentLocationId)
					: null;
			})
			.catch(e => (this.locationState.error = e as HttpErrorResponse))
			.finally(() => (this.locationState.loading = false));
	}
}
