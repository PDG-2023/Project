import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ItemModelView } from "./item-model.view";
import { ApiModule } from "../../../../../api";

describe("ItemModelView", () => {
	let component: ItemModelView;
	let fixture: ComponentFixture<ItemModelView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemModelView],
			imports: [ApiModule, RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemModelView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
