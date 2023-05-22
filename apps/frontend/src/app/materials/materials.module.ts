import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
	exports: [
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		MatExpansionModule,
		MatExpansionModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule
	]
})
export class MaterialsModule {}
