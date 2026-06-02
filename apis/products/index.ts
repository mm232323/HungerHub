import { useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type { ListProductsParams, Product } from "@/types";
import type { ErrorType } from "@/types/api-fetch";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { customFetch } from "@/utils/customFetch";
import type { SecondParameter } from "@/utils/ts-helpers";
import { listCategories } from "../categories";

export const listProducts = async (
  params?: ListProductsParams,
  options?: RequestInit,
): Promise<Product[]> => {
  return customFetch<Product[]>(
    `/products${buildQueryParams(params)}`,
    { ...options, method: "GET" },
  );
};
export function useListProducts<
  TData = Awaited<ReturnType<typeof listProducts>>,
  TError = ErrorType<unknown>,
>(
  params?: ListProductsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof listProducts>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/products", params];
  const queryFn = () => listProducts(params, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getProduct = async (
  id: number,
  options?: RequestInit,
): Promise<Product> => {
  return customFetch<Product>(`/products/${id}`, {
    ...options,
    method: "GET",
  });
};

export function useGetProduct<
  TData = Awaited<ReturnType<typeof getProduct>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/products/${id}`];
  const queryFn = () => getProduct(id, options?.request);
  const query = useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
    ...options?.query,
  }) as any;
  return { ...query, queryKey };
}

export const getTrendingProducts = async (
  options?: RequestInit,
): Promise<Product[]> => {
  return customFetch<Product[]>("/products/trending", {
    ...options,
    method: "GET",
  });
};

export function useGetTrendingProducts<
  TData = Awaited<ReturnType<typeof getTrendingProducts>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getTrendingProducts>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/products/trending"];
  const queryFn = () => getTrendingProducts(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}
