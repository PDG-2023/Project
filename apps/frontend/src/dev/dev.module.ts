import { APP_INITIALIZER, NgModule, Provider } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";

import { DevNotifierSnackBar } from "./components/_lib/dev-notifier.snack-bar";
import { DevView } from "./dev.view";
import { LocationPreviewView } from "./views/components/location-preview/location-preview.view";
import { devRoutes } from "./views/dev.routes";
import { IndexView } from "./views/index/index.view";
import { StyleguideButtonsComponent } from "./views/styleguide/_lib/styleguide-buttons/styleguide-buttons.component";
import { StyleguideView } from "./views/styleguide/styleguide.view";
import { ComponentsModule } from "../app/components/components.module";

export const DevInitializerProvider: Provider = {
	deps: [MatSnackBar],
	multi: true,
	provide: APP_INITIALIZER,
	useFactory: (snackBar: MatSnackBar) => () => {
		const value = window.sessionStorage.getItem(DevNotifierSnackBar.SESSION_KEY);
		if (value === DevNotifierSnackBar.SESSION_NO_MORE) {
			return;
		}
		if (window.location.pathname.startsWith("/_dev")) {
			// Already in the dev page
			return;
		}

		snackBar.openFromComponent(DevNotifierSnackBar, {
			duration: 10000,
			horizontalPosition: "center",
			verticalPosition: "top"
		});
	}
};

@NgModule({
	declarations: [
		DevNotifierSnackBar,
		DevView,
		IndexView,
		LocationPreviewView,
		StyleguideButtonsComponent,
		StyleguideView
	],
	exports: [MatSnackBarModule],
	imports: [
		ComponentsModule,
		RouterModule.forChild([
			{
				children: devRoutes,
				component: DevView,
				path: ""
			}
		])
	]
})
export class DevModule {}
