import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { LoginView } from "./login.view";
import { ApiModule } from "../../../api";
import { MaterialsModule } from "../../materials/materials.module";
import { TranslationModule } from "../../translation";

describe("LoginView", () => {
	let component: LoginView;
	let fixture: ComponentFixture<LoginView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginView],
			imports: [
				ApiModule,
				MaterialsModule,
				NoopAnimationsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				TranslationModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
