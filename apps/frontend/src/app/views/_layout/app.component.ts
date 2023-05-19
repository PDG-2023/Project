import { Component } from "@angular/core";
import { map, Observable } from "rxjs";

import { AuthApiService } from "../../../api/auth-api";

@Component({
	selector: "app-root",
	styleUrls: ["./app.component.scss"],
	templateUrl: "./app.component.html"
})
export class AppComponent {
	public readonly isUserConnected: Observable<boolean>;

	public constructor(private readonly authService: AuthApiService) {
		this.isUserConnected = this.authService.getUserConnected().pipe(map(user => !!user));
	}
}
