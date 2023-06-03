type RouteParamPrefix = ":";

export type RouteParam<T extends string> = `${RouteParamPrefix}${T}`;
