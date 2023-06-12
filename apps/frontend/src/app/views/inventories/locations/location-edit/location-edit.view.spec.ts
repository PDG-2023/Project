import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { LocationEditView } from "./location-edit.view";
import { ApiModule } from "../../../../../api";
import { MaterialsModule } from "../../../../materials/materials.module";
import { TranslationModule } from "../../../../translation";

describe("LocationView", () => {
	let component: LocationEditView;
	let fixture: ComponentFixture<LocationEditView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LocationEditView],
			imports: [ApiModule, MaterialsModule, RouterTestingModule, TranslationModule]
		}).compileComponents();

		fixture = TestBed.createComponent(LocationEditView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
