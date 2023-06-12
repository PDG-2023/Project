import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { InventoryView } from "./inventory/inventory.view";
import { InventoryDto } from "../../../api/inventory-api/dtos";
import { AuthService } from "../../auth/auth.service";
import { SubscribableComponent } from "../../components/_lib/subscribable.component";
import { InventoryService } from "../../inventory/inventory.service";

@Component({
	styleUrls: ["./inventories.view.scss"],
	templateUrl: "./inventories.view.html"
})
export class InventoriesView extends SubscribableComponent implements OnInit {
	public static PATH = "/inventories";
	public static get ROUTE_PATH() {
		return InventoriesView.PATH.slice(1);
	}

	protected readonly InventoryView = InventoryView;

	protected current: InventoryDto | null = null;
	protected inventories?: Array<{ inventory: InventoryDto; isOwner: boolean }>;

	public constructor(
		private readonly service: InventoryService,
		private readonly authService: AuthService
	) {
		super();
	}

	public async ngOnInit() {
		this.addSubscriptions(
			this.service.inventoryCurrent$.subscribe(inventory => (this.current = inventory))
		);

		const user = await firstValueFrom(this.authService.userConnected$);

		this.inventories = await this.service.api
			.findAndCount()
			.then(({ data }) =>
				data.map(inventory => ({ inventory, isOwner: user.id === inventory.owner_id }))
			);
	}

	public setCurrent(inventory: InventoryDto) {
		this.service.setInventory(inventory);
	}
}
