import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { ItemModelView } from "./item-model.view";
import { ApiModule } from "../../../../../api";
import { DescribableBrowserComponent } from "../../../../components/describables/describable-browser/describable-browser.component";
import { MaterialsModule } from "../../../../materials/materials.module";
import { TranslationModule } from "../../../../translation";

describe("ItemModelView", () => {
	let component: ItemModelView;
	let fixture: ComponentFixture<ItemModelView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemModelView],
			imports: [
				ApiModule,
				DescribableBrowserComponent,
				FormsModule,
				MaterialsModule,
				NoopAnimationsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				TranslationModule
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ItemModelView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
