import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { UserApiService } from "../../../api/user-api";
import { UserDto, UserUpdateDto } from "../../../api/user-api/dtos";
import { AuthService } from "../../auth/auth.service";
import { SubscribableComponent } from "../../components/_lib/subscribable.component";
import { LoginView } from "../login/login.view";

@Component({
	styleUrls: ["./profile.view.scss"],
	templateUrl: "./profile.view.html"
})
export class ProfileView extends SubscribableComponent implements OnInit {
	public static PATH = "/profile";

	public static get ROUTE_PATH() {
		return ProfileView.PATH.slice(1);
	}

	protected user!: UserDto;
	protected userForm = new FormGroup<
		Record<keyof Pick<UserUpdateDto, "firstName" | "lastName">, FormControl<string>>
	>({
		firstName: new FormControl("", { nonNullable: true }),
		lastName: new FormControl("", { nonNullable: true })
	});

	protected passwordShow = false;
	protected passwordLock = true;
	protected passwordForm = new FormControl<string>("");

	public constructor(
		private readonly authService: AuthService,
		private readonly userApi: UserApiService,
		private readonly router: Router
	) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.authService.userConnected$.subscribe(user => {
				this.user = user;

				const { firstName, lastName } = this.userForm.controls;

				firstName.setValue(user.firstName);
				lastName.setValue(user.lastName);
			})
		);
	}

	public handleLogout() {
		this.authService.invalidUser();
		void this.router.navigate([LoginView.PATH_LOGIN]);
	}

	public handleUserSubmit() {
		if (this.userForm.invalid) {
			return;
		}

		const { firstName, lastName } = this.userForm.value;
		if (!firstName || !lastName) {
			return;
		}

		void this.userApi
			.replace(this.user.id, { ...this.user, firstName, lastName })
			.then(() => this.authService.updateConnected());
	}

	public handlePasswordSubmit() {
		const { value } = this.passwordForm;
		if (this.passwordForm.invalid || !value || this.passwordLock) {
			return;
		}

		void this.userApi
			.replace(this.user.id, {
				...this.user,
				plainPassword: value
			})
			.then(() => {
				this.passwordLock = true;
				this.passwordShow = false;
				this.passwordForm.setValue(null);
			});
	}
}
