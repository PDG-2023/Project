import { TestBed } from "@angular/core/testing";

import { InventoryService } from "./inventory.service";
import { ApiModule } from "../../api";

describe("InventoryService", () => {
	let service: InventoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule],
			providers: [InventoryService]
		});
		service = TestBed.inject(InventoryService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
