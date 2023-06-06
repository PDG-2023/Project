import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { InventoryErrorView } from "./inventory-error.view";
import { TranslationModule } from "../../../translation";

describe("InventoryErrorView", () => {
	let component: InventoryErrorView;
	let fixture: ComponentFixture<InventoryErrorView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InventoryErrorView],
			imports: [TranslationModule],
			providers: [
				{ provide: ActivatedRoute, useValue: { snapshot: { data: { _error: {} } } } }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(InventoryErrorView);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
