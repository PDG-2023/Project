import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LocationsView } from "./locations.view";
import { ApiModule } from "../../../../api";

describe("LocationsView", () => {
	let component: LocationsView;
	let fixture: ComponentFixture<LocationsView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LocationsView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(LocationsView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
