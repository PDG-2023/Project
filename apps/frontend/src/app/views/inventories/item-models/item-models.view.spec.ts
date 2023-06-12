import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { ItemModelsView } from "./item-models.view";
import { ApiModule } from "../../../../api";
import { DescribableBrowserComponent } from "../../../components/describables/describable-browser/describable-browser.component";
import { MaterialsModule } from "../../../materials/materials.module";

describe("ItemModelsView", () => {
	let component: ItemModelsView;
	let fixture: ComponentFixture<ItemModelsView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemModelsView],
			imports: [
				ApiModule,
				DescribableBrowserComponent,
				FormsModule,
				MaterialsModule,
				NoopAnimationsModule,
				ReactiveFormsModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemModelsView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
