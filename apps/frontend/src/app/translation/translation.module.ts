import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { TranslateControlErrorPipe } from "./pipes/translation-control-error.pipe";
import { TranslationLoader } from "./translation.loader";
import { TranslationService } from "./translation.service";
import { TranslationLanguage } from "./translation.types";

@NgModule({
	declarations: [TranslateControlErrorPipe],
	exports: [TranslateControlErrorPipe, TranslateModule],
	imports: [
		TranslateModule.forRoot({
			defaultLanguage: "en" satisfies TranslationLanguage,
			isolate: false,
			loader: {
				provide: TranslateLoader,
				useValue: new TranslationLoader()
			}
		})
	],
	providers: [TranslationService]
})
export class TranslationModule {}
