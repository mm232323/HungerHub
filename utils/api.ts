/**
 * Back-compat barrel: prefer `@/apis` or `@/apis/<domain>` for hooks and fetchers.
 */
export { setBaseUrl, setAuthTokenGetter, customFetch, ApiError } from "./customFetch";
export type { CustomFetchOptions } from "./customFetch";
export type { AuthTokenGetter, BodyType } from "@/types/http-client";
export type { ErrorType } from "@/types/api-fetch";
export type { SecondParameter } from "./ts-helpers";

export * from "@/apis";
