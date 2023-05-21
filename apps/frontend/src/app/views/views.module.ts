import { NgModule } from "@angular/core";

import { AppComponent } from "./_layout/app.component";
import { FooterComponent } from "./_layout/footer/footer.component";
import { HeaderComponent } from "./_layout/header/header.component";
import { SidebarComponent } from "./_layout/sidebar/sidebar.component";
import { IndexView } from "./index/index.view";
import { ItemModelView } from "./item-models/item-model/item-model.view";
import { ItemModelsView } from "./item-models/item-models.view";
import { LocationView } from "./locations/location/location.view";
import { LocationsView } from "./locations/locations.view";
import { NotFoundView } from "./not-found/not-found.view";
import { ProfileView } from "./profile/profile.view";
import { ComponentsModule } from "../components/components.module";
import { AppRouterModule } from "../router";

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		HeaderComponent,
		IndexView,
		ItemModelsView,
		ItemModelView,
		LocationsView,
		LocationView,
		NotFoundView,
		ProfileView,
		SidebarComponent
	],
	imports: [AppRouterModule, ComponentsModule]
})
export class ViewsModule {}
