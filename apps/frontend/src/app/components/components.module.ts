import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { DescribableBrowserComponent } from "./describables/describable-browser/describable-browser.component";
import { DescribablePreviewComponent } from "./describables/describable-preview/describable-preview.component";
import { InventoryPreviewComponent } from "./inventories/inventory-preview/inventory-preview.component";
import { SearchResultPreviewComponent } from "./search-result-preview/search-result-preview.component";
import { MaterialsModule } from "../materials/materials.module";
import { TranslationModule } from "../translation";

@NgModule({
	exports: [
		CommonModule,
		DescribableBrowserComponent,
		DescribablePreviewComponent,
		InventoryPreviewComponent,
		MaterialsModule,
		ReactiveFormsModule,
		SearchResultPreviewComponent,
		TranslationModule
	],
	imports: [
		CommonModule,
		DescribableBrowserComponent,
		DescribablePreviewComponent,
		InventoryPreviewComponent,
		MaterialsModule,
		ReactiveFormsModule,
		RouterModule,
		SearchResultPreviewComponent,
		TranslationModule
	]
})
export class ComponentsModule {}
