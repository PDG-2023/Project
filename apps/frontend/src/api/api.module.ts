import { NgModule } from "@angular/core";

import { ApiClient } from "./api.client";
import { AuthApiModule } from "./auth-api";
import { CategoryApiModule } from "./category-api";
import { InventoryApiModule } from "./inventory-api";
import { ItemApiModule } from "./item-api";
import { ItemModelApiModule } from "./item-model-api";
import { MovementApiModule } from "./movement-api";
import { UserApiModule } from "./user-api";

@NgModule({
	exports: [
		AuthApiModule,
		CategoryApiModule,
		InventoryApiModule,
		ItemApiModule,
		ItemModelApiModule,
		MovementApiModule,
		UserApiModule
	],
	imports: [ApiClient]
})
export class ApiModule {}
