import { TestBed } from "@angular/core/testing";

import { LocationApiService } from "./location-api.service";
import { ApiModule } from "../api.module";

describe("LocationApiService", () => {
	let service: LocationApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(LocationApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
