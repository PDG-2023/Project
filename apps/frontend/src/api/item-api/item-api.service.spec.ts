import { TestBed } from "@angular/core/testing";

import { ItemApiService } from "./item-api.service";
import { ApiModule } from "../api.module";

describe("ItemApiService", () => {
	let service: ItemApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(ItemApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
