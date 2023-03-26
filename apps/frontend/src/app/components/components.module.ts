import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialsModule } from "./materials.module";
import { TranslationModule } from "../translation";

@NgModule({
	declarations: [],
	exports: [CommonModule, MaterialsModule, TranslationModule],
	imports: [CommonModule, MaterialsModule, RouterModule, TranslationModule]
})
export class ComponentsModule {}
