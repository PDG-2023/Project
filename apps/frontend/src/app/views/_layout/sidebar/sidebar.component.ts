import { Component } from "@angular/core";

import { AuthService } from "../../../auth/auth.service";
import { LoginView } from "../../login/login.view";

@Component({
	selector: "app-sidebar",
	styleUrls: ["./sidebar.component.scss"],
	templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
	protected readonly isUserConnected$ = this.authService.isUserConnected$;
	protected readonly LoginView = LoginView;

	public constructor(private readonly authService: AuthService) {}
}
