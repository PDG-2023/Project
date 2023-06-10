import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { DescribableBrowserComponent } from "./describable-browser.component";

describe("DescribableBrowserComponent", () => {
	let component: DescribableBrowserComponent;
	let fixture: ComponentFixture<DescribableBrowserComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DescribableBrowserComponent, NoopAnimationsModule]
		}).compileComponents();

		fixture = TestBed.createComponent(DescribableBrowserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
