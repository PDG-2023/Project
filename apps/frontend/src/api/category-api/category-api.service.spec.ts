import { TestBed } from "@angular/core/testing";

import { CategoryApiService } from "./category-api.service";
import { ApiModule } from "../api.module";

describe("CategoryApiService", () => {
	let service: CategoryApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(CategoryApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
