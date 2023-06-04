import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

export interface InventoryErrorViewData {
	_error: HttpErrorResponse;
}

@Component({
	styleUrls: ["./inventory-error.view.scss"],
	templateUrl: "./inventory-error.view.html"
})
export class InventoryErrorView {
	protected readonly error: HttpErrorResponse;

	public constructor(activatedRoute: ActivatedRoute) {
		this.error = (activatedRoute.snapshot.data as InventoryErrorViewData)._error;
	}
}
