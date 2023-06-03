import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { ApiModule } from "../../api";

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ApiModule] });
		service = TestBed.inject(AuthService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
