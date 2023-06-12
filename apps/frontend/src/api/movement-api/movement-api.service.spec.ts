import { TestBed } from "@angular/core/testing";

import { MovementApiService } from "./movement-api.service";
import { ApiModule } from "../api.module";

describe("MovementApiService", () => {
	let service: MovementApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(MovementApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
