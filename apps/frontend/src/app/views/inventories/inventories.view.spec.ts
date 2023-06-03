import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InventoriesView } from "./inventories.view";
import { ApiModule } from "../../../api";

describe("InventoriesView", () => {
	let component: InventoriesView;
	let fixture: ComponentFixture<InventoriesView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InventoriesView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(InventoriesView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
