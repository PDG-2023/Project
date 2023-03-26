import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IndexView } from "./index.view";
import { ApiModule } from "../../../api";

describe("IndexView", () => {
	let component: IndexView;
	let fixture: ComponentFixture<IndexView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [IndexView],
			imports: [ApiModule]
		}).compileComponents();

		fixture = TestBed.createComponent(IndexView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
