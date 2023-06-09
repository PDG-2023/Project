import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { DescribablePreviewComponent } from "./describables/describable-preview/describable-preview.component";
import { InventoryPreviewComponent } from "./inventories/inventory-preview/inventory-preview.component";
import { MaterialsModule } from "../materials/materials.module";
import { TranslationModule } from "../translation";

@NgModule({
	exports: [
		CommonModule,
		DescribablePreviewComponent,
		InventoryPreviewComponent,
		MaterialsModule,
		ReactiveFormsModule,
		TranslationModule
	],
	imports: [
		CommonModule,
		DescribablePreviewComponent,
		InventoryPreviewComponent,
		MaterialsModule,
		ReactiveFormsModule,
		RouterModule,
		TranslationModule
	]
})
export class ComponentsModule {}
