import { Route } from "@angular/router";

import { DescribablePreviewView } from "./components/describable-preview/describable-preview.view";
import { IndexView } from "./index/index.view";
import { StyleguideView } from "./styleguide/styleguide.view";

export const devRoutes: Route[] = [
	{ component: IndexView, path: "" },
	{ component: DescribablePreviewView, path: "components/describable-preview" },
	{ component: StyleguideView, path: "styleguide" }
];
