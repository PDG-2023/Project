import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CategoryEditView } from "./category-edit.view";
import { ApiModule } from "../../../../../api";
import { MaterialsModule } from "../../../../materials/materials.module";
import { TranslationModule } from "../../../../translation";

describe("CategoryEditView", () => {
	let component: CategoryEditView;
	let fixture: ComponentFixture<CategoryEditView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CategoryEditView],
			imports: [ApiModule, MaterialsModule, RouterTestingModule, TranslationModule]
		}).compileComponents();

		fixture = TestBed.createComponent(CategoryEditView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
