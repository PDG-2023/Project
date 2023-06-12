import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { ProfileView } from "./profile.view";
import { ApiTestProviders } from "../../../../test/support/api/api.test.providers";
import { DbBaseSample } from "../../../../test/support/samples";
import { ApiModule } from "../../../api";
import { AuthService } from "../../auth/auth.service";
import { MaterialsModule } from "../../materials/materials.module";
import { TranslationModule } from "../../translation";

describe("ProfileView", () => {
	let component: ProfileView;
	let fixture: ComponentFixture<ProfileView>;

	beforeEach(async () => {
		const testBed = TestBed.configureTestingModule({
			declarations: [ProfileView],
			imports: [
				ApiModule,
				FormsModule,
				ReactiveFormsModule,
				MaterialsModule,
				NoopAnimationsModule,
				TranslationModule
			],
			providers: [...ApiTestProviders]
		});

		await testBed.compileComponents();
		const authService = testBed.inject(AuthService);
		await authService.login({ password: "password", username: DbBaseSample.users[0].email });

		fixture = TestBed.createComponent(ProfileView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
