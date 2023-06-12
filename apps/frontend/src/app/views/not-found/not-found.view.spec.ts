import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotFoundView } from "./not-found.view";
import { TranslationModule } from "../../translation";

describe("NotFoundView", () => {
	let component: NotFoundView;
	let fixture: ComponentFixture<NotFoundView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NotFoundView],
			imports: [TranslationModule]
		}).compileComponents();

		fixture = TestBed.createComponent(NotFoundView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
