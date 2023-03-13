import { Route } from "@angular/router";

import { IndexView } from "./index/index.view";
import { NotFoundView } from "./not-found/not-found.view";

export const appRoutes: Route[] = [
	{
		component: IndexView,
		path: ""
	},
	{
		component: NotFoundView,
		path: "**"
	}
];
