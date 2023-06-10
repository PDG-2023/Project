import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { InventoryPreviewComponent } from "./inventory-preview.component";
import { DbBaseSample } from "../../../../../test/support/samples";

describe("InventoryPreviewComponent", () => {
	let component: InventoryPreviewComponent;
	let fixture: ComponentFixture<InventoryPreviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InventoryPreviewComponent, NoopAnimationsModule]
		}).compileComponents();

		fixture = TestBed.createComponent(InventoryPreviewComponent);
		component = fixture.componentInstance;

		component.inventory = DbBaseSample.inventories[0];

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
