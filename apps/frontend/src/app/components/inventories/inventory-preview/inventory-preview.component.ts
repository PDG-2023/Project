import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

import { InventoryDto } from "../../../../api/inventory-api/dtos";
import { TranslationModule } from "../../../translation";

@Component({
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		RouterLink,
		TranslationModule
	],
	selector: "app-inventory-preview",
	standalone: true,
	styleUrls: ["./inventory-preview.component.scss"],
	templateUrl: "./inventory-preview.component.html"
})
export class InventoryPreviewComponent {
	@Input()
	public inventory!: InventoryDto;
	/**
	 * Is this inventory selected
	 */
	@Input()
	public selected = false;
	/**
	 * Is the user the owner
	 */
	@Input()
	public isOwner = false;

	/**
	 * Emitted when the 'set as current' button is clicked.
	 * Returns this inventory in the event
	 */
	@Output()
	public readonly setCurrentClick = new EventEmitter<InventoryDto>();
}
