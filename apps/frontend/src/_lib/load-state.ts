import { HttpErrorResponse } from "@angular/common/http";

export interface LoadState<T> {
	data?: T;
	error: HttpErrorResponse | false;
	loading: boolean;
}
