import { OnDestroy, Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { Subscription } from "rxjs";

import { TranslationService } from "../translation.service";

@Pipe({
	name: "translateControlError",
	// Only true for 1 language
	pure: true
})
export class TranslateControlErrorPipe implements PipeTransform, OnDestroy {
	private value = "";
	private subscription?: Subscription;

	public constructor(private readonly service: TranslationService) {}

	public ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	public transform(errors: ValidationErrors | null): string {
		// When something change, "reset"
		this.ngOnDestroy();
		this.service.translateControlError(errors).subscribe(value => (this.value = value));

		return this.value;
	}
}
