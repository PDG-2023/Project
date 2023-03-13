import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialsModule } from "./materials.module";
import { TranslationModule } from "../translation";

@NgModule({
	declarations: [],
	exports: [MaterialsModule, TranslationModule],
	imports: [MaterialsModule, RouterModule, TranslationModule]
})
export class ComponentsModule {}
