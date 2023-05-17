import { TestBed } from "@angular/core/testing";

import { InventoryApiService } from "./inventory-api.service";
import { ApiModule } from "../api.module";

describe("InventoryApiService", () => {
	let service: InventoryApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(InventoryApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
