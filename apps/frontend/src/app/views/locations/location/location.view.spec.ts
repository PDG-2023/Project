import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LocationView } from "./location.view";
import { ApiModule } from "../../../../api";

describe("LocationView", () => {
	let component: LocationView;
	let fixture: ComponentFixture<LocationView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LocationView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(LocationView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
