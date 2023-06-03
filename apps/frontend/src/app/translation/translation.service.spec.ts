import { TestBed } from "@angular/core/testing";

import { TranslationModule } from "./translation.module";
import { TranslationService } from "./translation.service";

describe("TranslationService", () => {
	let service: TranslationService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [TranslationModule] });
		service = TestBed.inject(TranslationService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
