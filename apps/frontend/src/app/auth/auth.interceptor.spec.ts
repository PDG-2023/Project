import { TestBed } from "@angular/core/testing";

import { AuthInterceptor } from "./auth.interceptor";
import { ApiModule } from "../../api";

describe("AuthInterceptor", () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [ApiModule],
			providers: [AuthInterceptor]
		})
	);

	it("should be created", () => {
		const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
		expect(interceptor).toBeTruthy();
	});
});
