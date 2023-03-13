import { TranslateLoader } from "@ngx-translate/core";
import { of } from "rxjs";

import { TranslationLanguage, TranslationLocales } from "./translation.types";
import { Locale, LOCALE_EN } from "../../locale";

export class TranslationLoader implements TranslateLoader {
	private readonly locales: TranslationLocales = { en: LOCALE_EN };

	public constructor(private readonly fallback: TranslationLanguage = "en") {}

	public getTranslation(lang: string) {
		return of(
			(this.locales as Record<string, Locale | undefined>)[lang] ??
				this.locales[this.fallback]
		);
	}
}
