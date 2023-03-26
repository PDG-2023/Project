import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./views/_layout/app.component";
import { ViewsModule } from "./views/views.module";
import { ApiModule } from "../api";

@NgModule({
	bootstrap: [AppComponent],
	imports: [ApiModule, BrowserAnimationsModule, BrowserModule, RouterModule, ViewsModule]
})
export class AppModule {}
