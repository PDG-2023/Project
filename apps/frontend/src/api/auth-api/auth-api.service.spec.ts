import { TestBed } from "@angular/core/testing";

import { AuthApiService } from "./auth-api.service";
import { ApiModule } from "../api.module";

describe("AuthApiService", () => {
	let service: AuthApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(AuthApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
