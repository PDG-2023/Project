import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { DescribablePreviewComponent } from "./describable-preview.component";
import { DbBaseSample } from "../../../../../test/support/samples";

describe("DescribablePreviewComponent", () => {
	let component: DescribablePreviewComponent;
	let fixture: ComponentFixture<DescribablePreviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DescribablePreviewComponent, NoopAnimationsModule, RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(DescribablePreviewComponent);
		component = fixture.componentInstance;

		component.describable = DbBaseSample.categories[0];
		component.hrefShow = "";
		component.hrefEdit = "";

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
