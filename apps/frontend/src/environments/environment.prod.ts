import { Environment } from "./environment.interface";

let backend_url: string | undefined;

export const environment: Environment = {
	backend: {
		get url() {
			if (!backend_url) {
				backend_url = `${window.location.protocol}//${window.location.host}/api`;
			}

			return backend_url;
		}
	}
};
