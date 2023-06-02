import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";
import { ApiModule } from "../../../../api";
import { MaterialsModule } from "../../../materials/materials.module";

describe("FooterComponent", () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterComponent],
			imports: [ApiModule, MaterialsModule]
		}).compileComponents();

		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
