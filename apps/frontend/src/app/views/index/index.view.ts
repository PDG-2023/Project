import { Component, OnInit } from "@angular/core";

import { ApiClient } from "../../../api";

@Component({
	styleUrls: ["./index.view.scss"],
	templateUrl: "./index.view.html"
})
export class IndexView implements OnInit {
	// Current implementation for demo only

	public data: unknown = null;

	public constructor(private readonly apiClient: ApiClient) {}

	public ngOnInit() {
		this.loadContent();
	}

	public loadContent() {
		void this.apiClient.get("/").then(data => (this.data = data));
	}
}
