import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginView } from "./login.view";
import { ApiModule } from "../../../api";

describe("LoginView", () => {
	let component: LoginView;
	let fixture: ComponentFixture<LoginView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
