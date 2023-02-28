import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { appRoutes } from "../views/app.routes";

@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(appRoutes, {
			initialNavigation: "enabledBlocking"
		})
	]
})
export class AppRouterModule {}
