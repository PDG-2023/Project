import { NgModule } from "@angular/core";

import { AuthService } from "./auth.service";
import { ApiModule } from "../../api";

@NgModule({
	imports: [ApiModule],
	providers: [AuthService]
})
export class AuthModule {}
