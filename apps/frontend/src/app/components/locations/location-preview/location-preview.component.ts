import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { LocationDto } from "../../../../api/location-api/dtos";
import { Router } from "@angular/router";

@Component({
	selector: "app-location-preview",
	styleUrls: ["./location-preview.component.scss"],
	templateUrl: "./location-preview.component.html"
})
export class LocationPreviewComponent implements OnInit{

	constructor(private router:Router) {}

	name!: string;
	subtitle!:	string;
	description!: string;
	ngOnInit(): void {
		this.name = "Name test"
		this.subtitle = "subtitle test"
		this.description = "The Shiba Inu is the smallest of the six original and distinct spitz breeds of\n" +
			"\t\t\t\t\tdog from Japan. A small, agile dog that copes very well with mountainous\n" +
			"\t\t\t\t\tterrain, the Shiba Inu was originally bred for hunting."
	}

	onEdit() {
		this.router.navigateByUrl(this.hrefEdit);
	}

	onShow() {
		this.router.navigateByUrl(this.hrefShow);
	}

	onDelete() {
		//this.delete.emit(location)
	}

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
	// TODO HMS not used
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
