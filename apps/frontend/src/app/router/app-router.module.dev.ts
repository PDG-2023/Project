import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DevInitializerProvider, DevModule } from "../../dev/dev.module";
import { appRoutes } from "../views/app.routes";

@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot([{ loadChildren: () => DevModule, path: "_dev" }, ...appRoutes], {
			initialNavigation: "enabledBlocking"
		})
	],
	providers: [DevInitializerProvider]
})
export class AppRouterModule {}
