import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { SearchResultPreviewComponent } from "./search-result-preview.component";

describe("SearchResultPreviewComponent", () => {
	let component: SearchResultPreviewComponent;
	let fixture: ComponentFixture<SearchResultPreviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NoopAnimationsModule, SearchResultPreviewComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SearchResultPreviewComponent);

		component = fixture.componentInstance;
		component.searchResult = {
			id: 1,

			description: "A description",
			entityType: "location",
			name: "A name"
		};

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
