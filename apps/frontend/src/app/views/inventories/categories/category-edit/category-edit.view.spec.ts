import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CategoryEditView } from "./category-edit.view";
import { ApiModule } from "../../../../../api";

describe("CategoryEditView", () => {
	let component: CategoryEditView;
	let fixture: ComponentFixture<CategoryEditView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CategoryEditView],
			imports: [ApiModule, RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(CategoryEditView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
