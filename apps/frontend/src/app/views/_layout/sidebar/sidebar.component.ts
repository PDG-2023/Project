import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../../auth/auth.service";
import { InventoryService } from "../../../inventory/inventory.service";
import { CategoriesView } from "../../inventories/categories/categories.view";
import { InventoriesView } from "../../inventories/inventories.view";
import { ItemModelsView } from "../../inventories/item-models/item-models.view";
import { LocationsView } from "../../inventories/locations/locations.view";
import { LoginView } from "../../login/login.view";

@Component({
	selector: "app-sidebar",
	styleUrls: ["./sidebar.component.scss"],
	templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
	protected readonly ItemModelsView = ItemModelsView;
	protected readonly LocationsView = LocationsView;
	protected readonly CategoriesView = CategoriesView;
	protected readonly InventoriesView = InventoriesView;
	protected readonly LoginView = LoginView;

	protected readonly isUserConnected$ = this.authService.isUserConnected$;
	protected readonly inventoryCurrent$ = this.inventoryService.inventoryCurrent$;

	public constructor(
		private readonly router: Router,
		private readonly authService: AuthService,
		private readonly inventoryService: InventoryService
	) {}

	protected isCurrentPathEqualTo(path: string) {
		return this.router.url.startsWith(path);
	}
}
