import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoriesView } from "./categories.view";
import { ApiModule } from "../../../../api";

describe("LocationsView", () => {
	let component: CategoriesView;
	let fixture: ComponentFixture<CategoriesView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CategoriesView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(CategoriesView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
