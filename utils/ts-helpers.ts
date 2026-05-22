/** Second argument of a function type (e.g. `customFetch` options). */
export type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];
