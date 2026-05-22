import { useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type { Category } from "@/types";
import type { ErrorType } from "@/types/api-fetch";
import { customFetch } from "@/utils/customFetch";
import type { SecondParameter } from "@/utils/ts-helpers";

export const listCategories = async (
  options?: RequestInit,
): Promise<Category[]> => {
  return customFetch<Category[]>("/categories", { ...options, method: "GET" });
};

export function useListCategories<
  TData = Awaited<ReturnType<typeof listCategories>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof listCategories>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/categories"];
  const queryFn = () => listCategories(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}
