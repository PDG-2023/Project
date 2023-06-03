import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialsModule } from "../materials/materials.module";
import { TranslationModule } from "../translation";

@NgModule({
	declarations: [],
	exports: [CommonModule, MaterialsModule, ReactiveFormsModule, TranslationModule],
	imports: [CommonModule, MaterialsModule, ReactiveFormsModule, RouterModule, TranslationModule]
})
export class ComponentsModule {}
