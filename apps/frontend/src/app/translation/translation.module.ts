import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { TranslationLoader } from "./translation.loader";
import { TranslationLanguage } from "./translation.types";

@NgModule({
	imports: [
		TranslateModule.forRoot({
			defaultLanguage: "en" satisfies TranslationLanguage,
			isolate: false,
			loader: {
				provide: TranslateLoader,
				useValue: new TranslationLoader()
			}
		})
	]
})
export class TranslationModule {}
