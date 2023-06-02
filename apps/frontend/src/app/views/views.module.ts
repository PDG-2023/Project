import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppComponent } from "./_layout/app.component";
import { FooterComponent } from "./_layout/footer/footer.component";
import { HeaderComponent } from "./_layout/header/header.component";
import { SidebarComponent } from "./_layout/sidebar/sidebar.component";
import { ToolbarComponent } from "./_layout/toolbar/toolbar.component";
import { IndexView } from "./index/index.view";
import { CategoryView } from "./inventories/categories/categories/category.view";
import { CategoriesView } from "./inventories/categories/categories.view";
import { InventoriesView } from "./inventories/inventories.view";
import { InventoryView } from "./inventories/inventory/inventory.view";
import { ItemModelView } from "./inventories/item-models/item-model/item-model.view";
import { ItemModelsView } from "./inventories/item-models/item-models.view";
import { LocationView } from "./inventories/locations/location/location.view";
import { LocationsView } from "./inventories/locations/locations.view";
import { LoginView } from "./login/login.view";
import { NotFoundView } from "./not-found/not-found.view";
import { ProfileView } from "./profile/profile.view";
import { AuthInterceptor } from "../auth/auth.interceptor";
import { ComponentsModule } from "../components/components.module";
import { InventoryModule } from "../inventory/inventory.module";
import { AppRouterModule } from "../router";

@NgModule({
	declarations: [
		AppComponent,
		CategoriesView,
		CategoryView,
		FooterComponent,
		HeaderComponent,
		IndexView,
		InventoriesView,
		InventoryView,
		ItemModelsView,
		ItemModelView,
		LocationsView,
		LocationView,
		LoginView,
		NotFoundView,
		ProfileView,
		SidebarComponent,
		ToolbarComponent
	],
	imports: [AppRouterModule, ComponentsModule, InventoryModule],
	providers: [
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor
		}
	]
})
export class ViewsModule {}
