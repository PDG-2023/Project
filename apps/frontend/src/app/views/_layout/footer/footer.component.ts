import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Code2dScannerDialog } from "../../../components/dialogs/code-2d-scanner/code-2d-scanner.dialog";
import { InventoryService } from "../../../inventory/inventory.service";
import { SearchView } from "../../inventories/search/search.view";

/**
 * This is the footer with the quick actions (add and scan)
 */
@Component({
	selector: "app-footer",
	styleUrls: ["./footer.component.scss"],
	templateUrl: "./footer.component.html"
})
export class FooterComponent {
	protected readonly SearchView = SearchView;
	protected inventoryCurrent$ = this.inventoryService.inventoryCurrent$;

	public constructor(
		private readonly matDialog: MatDialog,
		private readonly inventoryService: InventoryService
	) {}

	protected openScanner() {
		this.matDialog.open(Code2dScannerDialog);
	}
}
