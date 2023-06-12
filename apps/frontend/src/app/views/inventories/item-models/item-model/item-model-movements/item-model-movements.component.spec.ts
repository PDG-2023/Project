import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { ItemModelMovementsComponent } from "./item-model-movements.component";
import { DbBaseSample } from "../../../../../../../test/support/samples";
import { ApiModule } from "../../../../../../api";
import { MaterialsModule } from "../../../../../materials/materials.module";
import { TranslationModule } from "../../../../../translation";

describe("ItemModelView", () => {
	let component: ItemModelMovementsComponent;
	let fixture: ComponentFixture<ItemModelMovementsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemModelMovementsComponent],
			imports: [
				ApiModule,
				MaterialsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				NoopAnimationsModule,
				TranslationModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemModelMovementsComponent);
		component = fixture.componentInstance;

		component.inventory = DbBaseSample.inventories[0];
		component.itemModel = DbBaseSample["items-models"][0];

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
