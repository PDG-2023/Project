import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DescribablePreviewComponent } from "./describable-preview.component";

describe("DescribablePreviewComponent", () => {
	let component: DescribablePreviewComponent;
	let fixture: ComponentFixture<DescribablePreviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DescribablePreviewComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(DescribablePreviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
