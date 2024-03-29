import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";

import { DevInitializerProvider, DevModule } from "../../dev/dev.module";
import { appRoutes } from "../views/app.routes";

@NgModule({
	exports: [RouterModule],
	imports: [
		MatSnackBarModule,
		RouterModule.forRoot([{ loadChildren: () => DevModule, path: "_dev" }, ...appRoutes], {
			initialNavigation: "enabledNonBlocking"
		})
	],
	providers: [DevInitializerProvider]
})
export class AppRouterModule {}
