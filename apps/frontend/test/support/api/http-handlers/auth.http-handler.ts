import { HttpResponse } from "@angular/common/http";

import { HttpHandlerTest, HttpHandlerTestParams } from "./_lib/http-handler.test.interface";

export class AuthHttpHandler implements HttpHandlerTest {
	public canHandle() {
		return false;
	}

	public handle(params: HttpHandlerTestParams) {
		const { fullUri } = params;

		return new HttpResponse({
			body: null,
			status: 503,
			url: fullUri
		});
	}
}
