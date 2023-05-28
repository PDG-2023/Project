import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

import { sleep } from "../../../_lib/utils";
import { UserApiService } from "../../../api/user-api";
import { UserDto } from "../../../api/user-api/dtos";
import { AuthService } from "../../auth/auth.service";
import { SubscribableComponent } from "../../components/_lib/subscribable.component";

export interface LoginViewData {
	/**
	 * Is it the register view
	 */
	register?: boolean;
}

export interface LoginViewQuery {
	/**
	 * Redirect to this url after login or register
	 */
	redirect?: string;
}

interface FormControls
	extends Record<keyof Pick<UserDto, "email" | "firstName" | "lastName">, FormControl<string>> {
	password: FormControl<string>;
}

@Component({
	styleUrls: ["./login.view.scss"],
	templateUrl: "./login.view.html"
})
export class LoginView extends SubscribableComponent implements OnInit {
	public static PATH_LOGIN = "/login";
	public static PATH_REGISTER = "/register";

	private static PASSWORD_MIN_LENGTH = 4;

	protected readonly paths = {
		login: LoginView.PATH_LOGIN,
		register: LoginView.PATH_REGISTER
	} as const;
	protected readonly form: FormGroup<FormControls>;

	protected user: UserDto | null = null;

	protected error: HttpErrorResponse | false = false;
	protected loading = false;
	protected isRegistering = false;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly authService: AuthService,
		private readonly userApiService: UserApiService,
		private readonly translateService: TranslateService
	) {
		super();

		const requiredOnRegister = (control: AbstractControl) =>
			this.isRegistering ? Validators.required(control) : null;

		this.form = new FormGroup({
			email: new FormControl("", {
				nonNullable: true,
				validators: [
					control => Validators.required(control),
					control => Validators.email(control)
				]
			}),
			firstName: new FormControl("", {
				nonNullable: true,
				validators: [requiredOnRegister]
			}),
			lastName: new FormControl("", {
				nonNullable: true,
				validators: [requiredOnRegister]
			}),
			password: new FormControl("", {
				nonNullable: true,
				validators: [
					control => Validators.required(control),
					control => Validators.minLength(LoginView.PASSWORD_MIN_LENGTH)(control)
				]
			})
		});
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.activatedRoute.data.subscribe((data: LoginViewData) => {
				this.isRegistering = data.register ?? false;
			}),
			this.authService.getUserConnected().subscribe(user => {
				this.user = user;

				if (!user) {
					return;
				}

				// TODO: default redirect
				const redirect =
					(this.activatedRoute.snapshot.queryParams as LoginViewQuery).redirect ?? "/";

				void sleep(2000).then(() => this.router.navigateByUrl(redirect));
			})
		);
	}

	public async handleSubmit() {
		if (this.form.invalid) {
			return;
		}

		this.error = false;
		this.loading = true;

		const { email, firstName, lastName, password } = this.form.getRawValue();
		const request = this.isRegistering
			? this.userApiService
					.create({
						email,
						firstName,
						lastName
					})
					.then(() => this.authService.login({ password, username: email }))
			: this.authService.login({
					password,
					username: email
			  });

		await request
			.catch(error => (this.error = error as HttpErrorResponse))
			.finally(() => (this.loading = false));
	}

	protected errorMessage(error: HttpErrorResponse): Observable<string> {
		/* eslint-disable @typescript-eslint/no-unsafe-return -- Library can return anything */
		switch (error.status) {
			case 400:
				return this.translateService.stream("errors.http.400");
			case 401:
				return this.translateService.stream("views.login.login-fail");
			case 500:
				return this.translateService.stream("errors.http.500");
		}

		return this.translateService.stream("errors.http.generic");
		/* eslint-enable */
	}
}
