import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemModelsView } from "./item-models.view";
import { ApiModule } from "../../../api";

describe("ItemModelsView", () => {
	let component: ItemModelsView;
	let fixture: ComponentFixture<ItemModelsView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemModelsView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemModelsView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
