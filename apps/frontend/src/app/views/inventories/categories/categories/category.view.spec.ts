import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CategoryView } from "./category.view";
import { ApiModule } from "../../../../../api";

describe("LocationView", () => {
	let component: CategoryView;
	let fixture: ComponentFixture<CategoryView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CategoryView],
			imports: [ApiModule, RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(CategoryView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
