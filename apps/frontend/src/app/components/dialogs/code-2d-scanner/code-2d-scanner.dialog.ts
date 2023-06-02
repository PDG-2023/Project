import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

import { TranslationModule } from "../../../translation";

@Component({
	imports: [MatDialogModule, MatButtonModule, TranslationModule, MatIconModule],
	standalone: true,
	styleUrls: ["./code-2d-scanner.dialog.scss"],
	templateUrl: "./code-2d-scanner.dialog.html"
})
export class Code2dScannerDialog {}
