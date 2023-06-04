import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { debounceTime, distinctUntilChanged, filter, lastValueFrom, Observable, tap } from "rxjs";

import { sleep } from "../../../../_lib/utils";
import { InventoryApiService } from "../../../../api/inventory-api";
import { InventoryDto } from "../../../../api/inventory-api/dtos";
import { UserApiService } from "../../../../api/user-api";
import { UserDto } from "../../../../api/user-api/dtos";
import { AuthService } from "../../../auth/auth.service";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../components/dialogs/confirm/confirm.dialog";
import { InventoryService } from "../../../inventory/inventory.service";
import { TranslationService } from "../../../translation/translation.service";
import { InventoriesView } from "../inventories.view";

export type InventoryViewRouteParam = "inventory";

interface LoadState<T> {
	data?: T;
	error: HttpErrorResponse | false;
	loading: boolean;
}

@Component({
	styleUrls: ["./inventory.view.scss"],
	templateUrl: "./inventory.view.html"
})
export class InventoryView extends SubscribableComponent implements OnInit {
	private static readonly PATH_PARAM: InventoryViewRouteParam = "inventory";

	/**
	 * @returns The path for the routes configuration
	 */
	public static get ROUTE_PATH() {
		return `${InventoriesView.ROUTE_PATH}/:${InventoryView.PATH_PARAM}`;
	}

	/**
	 * @param inventory The current inventory
	 * @returns the path for this view
	 */
	public static getPath(inventory: number): string {
		return `${InventoriesView.PATH}/${inventory}`;
	}

	protected error: HttpErrorResponse | false = false;
	protected inventory!: InventoryDto;
	protected user!: UserDto;

	protected usersState: LoadState<UserDto[]> = { error: false, loading: false };
	protected readonly tblUser = {
		// "Hack", provide type safety in template
		asUser: (u: UserDto) => u,
		columns: () => {
			const cols = ["id", "email", "firstName", "lastName"] satisfies Array<keyof UserDto>;

			return this.isOwner ? [...cols, "actions"] : cols;
		}
	} as const;

	protected readonly nameControl = new FormControl<string>("", {
		nonNullable: true,
		validators: [control => Validators.minLength(4)(control)]
	});
	protected readonly userControl = new FormControl<string>("", {
		nonNullable: true,
		validators: [control => Validators.email(control)]
	});

	private readonly USER_ERROR_KEY = "no-user";
	private userSelected: UserDto | null = null;

	protected get isOwner() {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- They could not be set at the loading of the page
		if (!this.user || !this.inventory) {
			return false;
		}

		return true || this.user.id === this.inventory.ownerId;
	}

	public constructor(
		private readonly matDialog: MatDialog,
		private readonly translateService: TranslateService,
		private readonly translationService: TranslationService,
		private readonly authService: AuthService,
		private readonly service: InventoryService,
		private readonly inventoryApi: InventoryApiService,
		private readonly userApi: UserApiService
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.authService.userConnected$.subscribe(user => (this.user = user)),
			this.service.inventoryExiting$.subscribe(data => {
				this.inventory = data;
				this.nameControl.setValue(data.name);

				this.usersState.loading = true;
				Promise.all(data.users.map(id => this.userApi.findById(id)))
					.then(async users => {
						await sleep(250);

						this.usersState.error = false;
						this.usersState.data = users;
					})
					.catch(error => (this.usersState.error = error as HttpErrorResponse))
					.finally(() => (this.usersState.loading = false));
			}),

			this.userControl.valueChanges
				.pipe(
					filter(() => Validators.email(this.userControl) === null),
					tap(() => (this.userSelected = null)),
					debounceTime(500),
					distinctUntilChanged()
				)
				.subscribe(email => {
					this.userApi
						.findAndCount({ limit: 1, offset: 0, where: { email: { $eq: email } } })
						.then(({ data }) => (this.userSelected = data.length ? data[0] : null))
						.catch(() => (this.userSelected = null))
						.finally(() => {
							const { errors } = this.userControl;
							if (errors === null) {
								if (!this.userSelected) {
									this.userControl.setErrors({ [this.USER_ERROR_KEY]: true });
								}

								return;
							}

							if (this.userSelected) {
								// eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- To avoid, but ...
								delete errors[this.USER_ERROR_KEY];
							} else {
								errors[this.USER_ERROR_KEY] = true;
							}

							this.userControl.setErrors(errors);
						});
				})
		);
	}

	public handleUpdate() {
		if (!this.isOwner || this.nameControl.invalid) {
			return Promise.resolve();
		}

		return this.afterUpdate(
			this.inventoryApi.replace(this.inventory.id, {
				...this.inventory,
				name: this.nameControl.value
			})
		);
	}

	public addUser() {
		if (!this.isOwner || this.userSelected === null) {
			return Promise.resolve();
		}

		return this.afterUpdate(
			this.inventoryApi.replace(this.inventory.id, {
				...this.inventory,
				users: [...this.inventory.users, this.userSelected.id]
			})
		).then(() => {
			this.userSelected = null;
			this.userControl.setValue("");
			this.userControl.markAsPristine();
		});
	}

	public removeUser(user: UserDto) {
		if (!this.isOwner) {
			return Promise.resolve();
		}

		return lastValueFrom(
			this.matDialog
				.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
					data: {
						confirm: this.translateService.get("actions.delete"),
						description: this.translateService.get(
							"views.inventory.dialogs.user-delete.description",
							user
						),
						title: this.translateService.get(
							"views.inventory.dialogs.user-delete.title",
							user
						)
					}
				})
				.afterClosed()
		).then(async confirmed => {
			if (confirmed) {
				await this.afterUpdate(
					this.inventoryApi.replace(this.inventory.id, {
						...this.inventory,
						users: this.inventory.users.filter(id => id !== user.id)
					})
				);
			}
		});
	}

	protected displayUserError(): Observable<string> {
		const { errors, value } = this.userControl;
		if (errors?.[this.USER_ERROR_KEY]) {
			return this.translateService.stream("views.inventory.user-not-found", {
				email: value
			}) as Observable<string>;
		}

		return this.translationService.translateControlError(errors);
	}

	private afterUpdate(fn: Promise<InventoryDto>) {
		return fn
			.then(updated => this.service.setInventory(updated))
			.catch(error => (this.error = error as HttpErrorResponse));
	}
}
