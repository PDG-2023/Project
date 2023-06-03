import { Component } from "@angular/core";
import { MatSnackBarRef } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
	templateUrl: "./dev-notifier.snack-bar.html"
})
export class DevNotifierSnackBar {
	public static SESSION_KEY = "ng_dev_sess";
	/**
	 * The message has been read
	 */
	public static SESSION_NO_MORE = "_dismissed";

	public constructor(
		private readonly ref: MatSnackBarRef<DevNotifierSnackBar>,
		private readonly router: Router
	) {}

	public goToPage() {
		return this.router.navigate(["/_dev"]).then(() => this.dismiss());
	}

	public dismiss() {
		this.ref.dismiss();
	}

	public stopSnack() {
		window.sessionStorage.setItem(
			DevNotifierSnackBar.SESSION_KEY,
			DevNotifierSnackBar.SESSION_NO_MORE
		);
		this.ref.dismiss();
	}
}
