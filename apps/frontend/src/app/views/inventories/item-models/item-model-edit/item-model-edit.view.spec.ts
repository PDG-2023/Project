import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ItemModelEditView } from "./item-model-edit.view";
import { ApiModule } from "../../../../../api";

describe("ItemModelView", () => {
	let component: ItemModelEditView;
	let fixture: ComponentFixture<ItemModelEditView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemModelEditView],
			imports: [ApiModule, RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemModelEditView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
