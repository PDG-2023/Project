import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DescribableBrowserComponent } from "./describable-browser.component";

describe("DescribablesBrowserComponent", () => {
	let component: DescribableBrowserComponent;
	let fixture: ComponentFixture<DescribableBrowserComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DescribableBrowserComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(DescribableBrowserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
