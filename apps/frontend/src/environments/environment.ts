import { Environment } from "./environment.interface";

export const environment: Environment = {
	backend: {
		// Use the webpack proxy
		url: `${window.location.origin}/api`
	}
};
