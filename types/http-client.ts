/** Resolves the bearer token for `customFetch` when `setAuthTokenGetter` is configured. */
export type AuthTokenGetter = () => Promise<string | null> | string | null;

export type BodyType<T> = T;
