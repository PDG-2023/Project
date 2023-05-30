import { Provider } from "@angular/core";

import { ApiInterceptorTestProvider } from "./api.test.interceptor";

// TODO: add more (cookie)?
/**
 * Use these providers for tests that require an HTTP request.
 */
export const ApiTestProviders: Provider[] = [ApiInterceptorTestProvider];
