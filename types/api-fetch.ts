import type { ApiError } from "@/utils/customFetch";

export type { ApiError, CustomFetchOptions } from "@/utils/customFetch";

/** Error shape used by React Query hooks in `@/apis`. */
export type ErrorType<T = unknown> = ApiError<T>;
