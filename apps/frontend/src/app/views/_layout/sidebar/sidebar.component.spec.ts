import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SidebarComponent } from "./sidebar.component";
import { ApiModule } from "../../../../api";
import { MaterialsModule } from "../../../materials/materials.module";
import { TranslationModule } from "../../../translation";
import { ToolbarComponent } from "../toolbar/toolbar.component";

describe("SidebarComponent", () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SidebarComponent, ToolbarComponent],
			imports: [ApiModule, MaterialsModule, RouterTestingModule, TranslationModule]
		}).compileComponents();

		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
