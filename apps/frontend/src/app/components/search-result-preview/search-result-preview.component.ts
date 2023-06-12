import { NgOptimizedImage } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

import { InventorySearchResultDto } from "../../../api/inventory-api/dtos";

@Component({
	selector: "app-search-result-preview",
	standalone: true,
	styleUrls: ["./search-result-preview.component.scss"],
	templateUrl: "./search-result-preview.component.html",

	imports: [MatCardModule, NgOptimizedImage]
})
export class SearchResultPreviewComponent {
	@Input()
	public searchResult!: InventorySearchResultDto;
}
