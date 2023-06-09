import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn, Route } from "@angular/router";

import { IndexView } from "./index/index.view";
import { CategoryView } from "./inventories/categories/categories/category.view";
import { CategoriesView } from "./inventories/categories/categories.view";
import { InventoriesView } from "./inventories/inventories.view";
import { InventoryView, InventoryViewRouteParam } from "./inventories/inventory/inventory.view";
import {
	InventoryErrorView,
	InventoryErrorViewData
} from "./inventories/inventory-error/inventory-error.view";
import { ItemModelView } from "./inventories/item-models/item-model/item-model.view";
import { ItemModelsView } from "./inventories/item-models/item-models.view";
import { LocationView } from "./inventories/locations/location/location.view";
import { LocationsView } from "./inventories/locations/locations.view";
import { SearchView } from "./inventories/search/search.view";
import { LoginView, LoginViewData } from "./login/login.view";
import { NotFoundView } from "./not-found/not-found.view";
import { ProfileView } from "./profile/profile.view";
import { AuthService } from "../auth/auth.service";
import { InventoryService } from "../inventory/inventory.service";

export const appRoutes: Route[] = [
	{ component: IndexView, path: "" },
	{ component: LoginView, path: LoginView.PATH_LOGIN.slice(1) },
	{
		component: LoginView,
		data: { register: true } satisfies LoginViewData,
		path: LoginView.PATH_REGISTER.slice(1)
	},
	{
		children: [
			{
				children: [
					{ component: CategoryView, path: CategoryView.ROUTE_PATH_PARAM },
					{ component: CategoriesView, path: "" }
				],
				path: CategoriesView.ROUTE_PATH
			},
			{
				children: [
					{ component: ItemModelView, path: ItemModelView.ROUTE_PATH_PARAM },
					{ component: ItemModelsView, path: "" }
				],
				path: ItemModelsView.ROUTE_PATH
			},
			{
				children: [
					{ component: LocationView, path: LocationView.ROUTE_PATH_PARAM },
					{ component: LocationsView, path: "" }
				],
				path: LocationsView.ROUTE_PATH
			},
			{ component: SearchView, path: SearchView.ROUTE_PATH },
			{ component: InventoryView, path: "" }
		],
		path: InventoryView.ROUTE_PATH,
		pathMatch: "prefix",
		resolve: {
			inventory: (route => {
				const params = route.params as Partial<Record<InventoryViewRouteParam, string>>;
				const service = inject(InventoryService);

				return service.loadInventory(+(params.inventory ?? "-")).catch(error => {
					// Kinda a "hack"
					route.component = InventoryErrorView;
					route.data = {
						_error: error as HttpErrorResponse
					} satisfies InventoryErrorViewData;
				});
			}) satisfies ResolveFn<unknown>
		}
	},
	{ component: InventoriesView, path: InventoriesView.ROUTE_PATH },
	{
		component: ProfileView,
		path: ProfileView.ROUTE_PATH,
		// This will load the user or redirect to the login if not connected
		resolve: { user: () => inject(AuthService).updateConnected() }
	},
	{ component: NotFoundView, path: "**" }
];
