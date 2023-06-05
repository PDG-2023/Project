import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Code2dScannerDialog } from "./code-2d-scanner.dialog";

describe("Code2dScannerDialog", () => {
	let component: Code2dScannerDialog;
	let fixture: ComponentFixture<Code2dScannerDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Code2dScannerDialog]
		}).compileComponents();

		fixture = TestBed.createComponent(Code2dScannerDialog);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
