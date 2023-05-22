import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LocationPreviewComponent } from "./locations/location-preview/location-preview.component";
import { MenuIconSelectorComponent } from "./menu-icon-selector/menu-icon-selector.component";
import { MaterialsModule } from "../materials/materials.module";
import { TranslationModule } from "../translation";

@NgModule({
	declarations: [LocationPreviewComponent, MenuIconSelectorComponent],
	exports: [CommonModule, LocationPreviewComponent, MaterialsModule, TranslationModule],
	imports: [CommonModule, MaterialsModule, RouterModule, TranslationModule]
})
export class ComponentsModule {}
