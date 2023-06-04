import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { marker } from "@biesbjerg/ngx-translate-extract-marker";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";

// Always keep these keys in the locale file
marker("formats.date");
marker("formats.datetime");
marker("formats.time");

@Injectable({
	providedIn: "root"
})
export class TranslationService {
	public constructor(private readonly translate: TranslateService) {}

	/**
	 * @param errors the errors received
	 * @returns the error message for an abstract control errors, empty string if no error
	 */
	public translateControlError(errors: ValidationErrors | null): Observable<string> {
		if (errors === null) {
			return of("");
		}

		/* eslint-disable @typescript-eslint/no-unsafe-return -- The library can return any object */
		if (errors.required !== undefined) {
			return this.translate.stream("errors.validation.required");
		}
		if (errors.email !== undefined) {
			return this.translate.stream("errors.validation.email");
		}
		if (errors.minlength !== undefined) {
			return this.translate.stream("errors.validation.minlength", errors.minlength as never);
		}

		return this.translate.stream("errors.validation.invalid");
		/* eslint-enable */
	}
}
