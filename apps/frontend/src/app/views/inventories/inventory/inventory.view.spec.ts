import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InventoryView } from "./inventory.view";
import { ApiModule } from "../../../../api";

describe("LocationsView", () => {
	let component: InventoryView;
	let fixture: ComponentFixture<InventoryView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InventoryView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(InventoryView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
