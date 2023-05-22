import { Component, EventEmitter, Output } from "@angular/core";
@Component({
	selector: "app-menu-icon-selector",
	templateUrl: "./menu-icon-selector.component.html",
	styleUrls: ["./menu-icon-selector.component.scss"]
})
export class MenuIconSelectorComponent {
	@Output()
	buttonDeleteClick: EventEmitter<any> = new EventEmitter<any>()

	@Output()
	buttOnEditClick: EventEmitter<any> = new EventEmitter<any>()

	onDelete(){
		this.buttonDeleteClick.emit();
	}

	onEdit() {
		this.buttOnEditClick.emit();
	}

}
