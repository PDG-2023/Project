import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileView } from "./profile.view";
import { ApiModule } from "../../../api";

describe("ProfileView", () => {
	let component: ProfileView;
	let fixture: ComponentFixture<ProfileView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProfileView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ProfileView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
