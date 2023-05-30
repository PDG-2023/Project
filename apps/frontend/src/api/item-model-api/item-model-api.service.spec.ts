import { TestBed } from "@angular/core/testing";

import { ItemModelApiService } from "./item-model-api.service";
import { ApiModule } from "../api.module";

describe("ItemModelApiService", () => {
	let service: ItemModelApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(ItemModelApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
