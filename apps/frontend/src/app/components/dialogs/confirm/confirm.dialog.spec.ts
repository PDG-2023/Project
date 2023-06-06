import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ConfirmDialog, ConfirmDialogData } from "./confirm.dialog";
import { MaterialsModule } from "../../../materials/materials.module";
import { TranslationModule } from "../../../translation";

describe("ConfirmComponent", () => {
	let component: ConfirmDialog;
	let fixture: ComponentFixture<ConfirmDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConfirmDialog, MaterialsModule, TranslationModule],
			providers: [
				{
					provide: MAT_DIALOG_DATA,
					useValue: { title: "Test" } satisfies ConfirmDialogData
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmDialog);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
