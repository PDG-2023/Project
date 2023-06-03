import { Component, OnInit } from "@angular/core";

import { InventoryView } from "./inventory/inventory.view";
import { InventoryDto } from "../../../api/inventory-api/dtos";
import { InventoryService } from "../../inventory/inventory.service";

@Component({
	styleUrls: ["./inventories.view.scss"],
	templateUrl: "./inventories.view.html"
})
export class InventoriesView implements OnInit {
	public static PATH = "/inventories";
	public static get ROUTE_PATH() {
		return InventoriesView.PATH.slice(1);
	}

	protected readonly InventoryView = InventoryView;

	protected inventories?: InventoryDto[];

	public constructor(private readonly service: InventoryService) {}

	public async ngOnInit() {
		this.inventories = await this.service.api.findAndCount().then(({ data }) => data);
	}
}
