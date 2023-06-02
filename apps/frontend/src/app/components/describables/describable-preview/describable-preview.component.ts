import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule, MatExpansionPanel } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink } from "@angular/router";

import { DescribableDto } from "../../../../api/_lib/entity-api/dtos";
import { TranslationModule } from "../../../translation";

@Component({
	imports: [
		CommonModule,
		MatButtonModule,
		MatExpansionModule,
		MatIconModule,
		MatMenuModule,
		RouterLink,
		TranslationModule
	],
	selector: "app-describable-preview",
	standalone: true,
	styleUrls: ["./describable-preview.component.scss"],
	templateUrl: "./describable-preview.component.html",
	// https://stackoverflow.com/questions/51545790/no-provider-for-matexpansionpanel-if-used-inside-child-component-in-ngfor
	viewProviders: [MatExpansionPanel]
})
export class DescribablePreviewComponent<T extends DescribableDto = DescribableDto> {
	/**
	 * The describable to preview
	 */
	@Input()
	public describable!: T;

	/**
	 * Does this describable has any children?
	 */
	@Input()
	public hasChildren = false;

	/**
	 * Expand the preview on rendering
	 */
	@Input()
	public expanded = false;
	/**
	 * When the describable become or is longer expanded.
	 * Only from the inside; setting the `expanded` input will not trigger this event.
	 */
	@Output()
	public readonly expandedChange = new EventEmitter<boolean>();

	/**
	 * `href` when asking to show the content of this describable
	 */
	@Input()
	public hrefShow!: string;
	/**
	 * `href` when asking to edit the content of this describable
	 */
	@Input()
	public hrefEdit!: string;

	/**
	 * Emitted when the delete action is triggered.
	 * Returns this describable in the event
	 */
	@Output()
	public readonly delete = new EventEmitter<T>();
}
