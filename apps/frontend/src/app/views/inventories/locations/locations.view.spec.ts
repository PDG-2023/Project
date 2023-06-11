import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { LocationsView } from "./locations.view";
import { DbBaseSample } from "../../../../../test/support/samples";
import { ApiModule } from "../../../../api";
import { DescribableBrowserComponent } from "../../../components/describables/describable-browser/describable-browser.component";
import { InventoryService } from "../../../inventory/inventory.service";
import { MaterialsModule } from "../../../materials/materials.module";
import { TranslationModule } from "../../../translation";

describe("LocationsView", () => {
	let component: LocationsView;
	let fixture: ComponentFixture<LocationsView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LocationsView],
			imports: [
				ApiModule,
				DescribableBrowserComponent,
				MaterialsModule,
				NoopAnimationsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				TranslationModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(LocationsView);

		TestBed.inject(InventoryService).setInventory(DbBaseSample.inventories[0]);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
