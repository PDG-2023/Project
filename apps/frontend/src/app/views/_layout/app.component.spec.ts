import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ApiModule } from "../../../api";
import { MaterialsModule } from "../../materials/materials.module";

describe("AppComponent", () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent, HeaderComponent, FooterComponent, SidebarComponent],
			imports: [ApiModule, MaterialsModule, NoopAnimationsModule, RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
