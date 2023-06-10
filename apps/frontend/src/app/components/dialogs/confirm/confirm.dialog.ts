import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ThemePalette } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { isObservable, Observable } from "rxjs";

import { TranslationModule } from "../../../translation";

type Text = Observable<string> | string;
export interface ConfirmDialogData {
	/**
	 * Text of the confirm button
	 * @default translation of "OK"
	 */
	confirm?: Text;
	/**
	 * Palette color of the confirm button
	 */
	confirmColor?: ThemePalette;
	/**
	 * Text of a description
	 * Can be html
	 */
	description?: Text;
	/**
	 * Title of the prompt
	 */
	title: Text;
}

@Component({
	selector: "app-confirm",
	styleUrls: ["./confirm.dialog.scss"],
	templateUrl: "./confirm.dialog.html",

	imports: [CommonModule, MatButtonModule, MatDialogModule, TranslationModule],
	standalone: true
})
export class ConfirmDialog {
	protected readonly isObservable = isObservable;

	public constructor(
		@Inject(MAT_DIALOG_DATA)
		public readonly data: ConfirmDialogData,
		private readonly translateService: TranslateService
	) {
		if (!data.title) {
			throw new Error("Title not set");
		}

		if (!data.confirm) {
			data.confirm = translateService.stream("actions.confirm");
		}
	}
}
