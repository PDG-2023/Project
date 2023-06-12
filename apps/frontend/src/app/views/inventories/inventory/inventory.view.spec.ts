import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { InventoryView } from "./inventory.view";
import { DbBaseSample } from "../../../../../test/support/samples";
import { ApiModule } from "../../../../api";
import { InventoryService } from "../../../inventory/inventory.service";
import { MaterialsModule } from "../../../materials/materials.module";
import { TranslationModule } from "../../../translation";

describe("LocationsView", () => {
	let component: InventoryView;
	let fixture: ComponentFixture<InventoryView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InventoryView],
			imports: [
				ApiModule,
				FormsModule,
				MaterialsModule,
				ReactiveFormsModule,
				NoopAnimationsModule,
				TranslationModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(InventoryView);

		TestBed.inject(InventoryService).setInventory(DbBaseSample.inventories[0]);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
