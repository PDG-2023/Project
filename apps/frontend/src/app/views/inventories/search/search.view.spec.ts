import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { SearchView } from "./search.view";
import { ApiModule } from "../../../../api";
import { MaterialsModule } from "../../../materials/materials.module";

describe("LocationsView", () => {
	let component: SearchView;
	let fixture: ComponentFixture<SearchView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchView],
			imports: [
				ApiModule,
				FormsModule,
				MaterialsModule,
				ReactiveFormsModule,
				NoopAnimationsModule,
				RouterTestingModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SearchView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
