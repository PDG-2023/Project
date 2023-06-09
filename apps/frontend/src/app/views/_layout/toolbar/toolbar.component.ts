import { Component, OnInit } from "@angular/core";

import { UserDto } from "../../../../api/user-api/dtos";
import { AuthService } from "../../../auth/auth.service";
import { SubscribableComponent } from "../../../components/_lib/subscribable.component";
import { LoginView } from "../../login/login.view";
import { ProfileView } from "../../profile/profile.view";

@Component({
	selector: "app-toolbar",
	styleUrls: ["./toolbar.component.scss"],
	templateUrl: "./toolbar.component.html"
})
export class ToolbarComponent extends SubscribableComponent implements OnInit {
	protected readonly LoginView = LoginView;
	protected readonly ProfileView = ProfileView;

	protected user: UserDto | null = null;

	public constructor(private readonly authService: AuthService) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(this.authService.user$.subscribe(user => (this.user = user)));
	}
}
