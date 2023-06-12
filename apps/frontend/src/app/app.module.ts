import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AuthService } from "./auth/auth.service";
import { AppComponent } from "./views/_layout/app.component";
import { ViewsModule } from "./views/views.module";
import { ApiModule } from "../api";

@NgModule({
	bootstrap: [AppComponent],
	imports: [ApiModule, BrowserAnimationsModule, BrowserModule, RouterModule, ViewsModule],
	providers: [
		{
			deps: [AuthService],
			multi: true,
			provide: APP_INITIALIZER,
			useFactory: (authService: AuthService) => () => authService._init()
		}
	]
})
export class AppModule {}
