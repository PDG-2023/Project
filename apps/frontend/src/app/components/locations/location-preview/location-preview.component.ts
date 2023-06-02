import { Component, EventEmitter, Input, Output } from "@angular/core";

import { LocationDto } from "../../../../api/location-api/dtos";

@Component({
	selector: "app-location-preview",
	styleUrls: ["./location-preview.component.scss"],
	templateUrl: "./location-preview.component.html"
})
export class LocationPreviewComponent {
	/**
	 * The location to preview
	 */
	@Input()
	public location!: LocationDto;

	/**
	 * Does this location has any children?
	 */
	@Input()
	public hasChildren = false;

	/**
	 * Expand the preview on rendering
	 */
	@Input()
	public expanded = false;
	/**
	 * When the location become or is longer expanded.
	 * Only from the inside; setting the `expanded` input will not trigger this event.
	 */
	@Output()
	public readonly expandedChange = new EventEmitter<boolean>();

	/**
	 * `href` when asking to show the content of this location
	 */
	@Input()
	public hrefShow!: string;
	/**
	 * `href` when asking to edit the content of this location
	 */
	@Input()
	public hrefEdit!: string;

	/**
	 * Emitted when the delete action is triggered.
	 * Returns this location in the event
	 */
	@Output()
	public readonly delete = new EventEmitter<LocationDto>();
}
