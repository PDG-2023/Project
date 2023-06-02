import { Route } from "@angular/router";

import { LocationPreviewView } from "./components/location-preview/location-preview.view";
import { IndexView } from "./index/index.view";
import { StyleguideView } from "./styleguide/styleguide.view";

export const devRoutes: Route[] = [
	{ component: IndexView, path: "" },
	{ component: LocationPreviewView, path: "components/location-preview" },
	{ component: StyleguideView, path: "styleguide" }
];
