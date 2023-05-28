import { Route } from "@angular/router";

import { IndexView } from "./index/index.view";
import { LoginView, LoginViewData } from "./login/login.view";
import { NotFoundView } from "./not-found/not-found.view";

export const appRoutes: Route[] = [
	{ component: IndexView, path: "" },
	{ component: LoginView, path: LoginView.PATH_LOGIN.slice(1) },
	{
		component: LoginView,
		data: { register: true } satisfies LoginViewData,
		path: LoginView.PATH_REGISTER.slice(1)
	},
	{ component: NotFoundView, path: "**" }
];
