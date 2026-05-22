import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  FollowStatus,
  ListMerchantsParams,
  Merchant,
  Product,
  Review,
} from "@/types";
import type { ErrorType } from "@/types/api-fetch";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { customFetch } from "@/utils/customFetch";
import type { SecondParameter } from "@/utils/ts-helpers";

export const listMerchants = async (
  params?: ListMerchantsParams,
  options?: RequestInit,
): Promise<Merchant[]> => {
  return customFetch<Merchant[]>(
    `/merchants${buildQueryParams(params)}`,
    { ...options, method: "GET" },
  );
};

export const getMerchant = async (
  id: number,
  options?: RequestInit,
): Promise<Merchant> => {
  return customFetch<Merchant>(`/merchants/${id}`, {
    ...options,
    method: "GET",
  });
};

export function useGetMerchant<
  TData = Awaited<ReturnType<typeof getMerchant>>,
  TError = ErrorType<void>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getMerchant>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/merchants/${id}`];
  const queryFn = () => getMerchant(id, options?.request);
  const query = useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
    ...options?.query,
  }) as any;
  return { ...query, queryKey };
}

export const followMerchant = async (
  id: number,
  options?: RequestInit,
): Promise<FollowStatus> => {
  return customFetch<FollowStatus>(`/merchants/${id}/follow`, {
    ...options,
    method: "POST",
  });
};

export function useFollowMerchant<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof followMerchant>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof followMerchant>>,
  TError,
  { id: number },
  TContext
> {
  const mutationFn = ({ id }: { id: number }) =>
    followMerchant(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const getMerchantProducts = async (
  id: number,
  options?: RequestInit,
): Promise<Product[]> => {
  return customFetch<Product[]>(`/merchants/${id}/products`, {
    ...options,
    method: "GET",
  });
};

export function useGetMerchantProducts<
  TData = Awaited<ReturnType<typeof getMerchantProducts>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getMerchantProducts>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/merchants/${id}/products`];
  const queryFn = () => getMerchantProducts(id, options?.request);
  const query = useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
    ...options?.query,
  }) as any;
  return { ...query, queryKey };
}

export const getMerchantReviews = async (
  id: number,
  options?: RequestInit,
): Promise<Review[]> => {
  return customFetch<Review[]>(`/merchants/${id}/reviews`, {
    ...options,
    method: "GET",
  });
};

export function useGetMerchantReviews<
  TData = Awaited<ReturnType<typeof getMerchantReviews>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getMerchantReviews>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/merchants/${id}/reviews`];
  const queryFn = () => getMerchantReviews(id, options?.request);
  const query = useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
    ...options?.query,
  }) as any;
  return { ...query, queryKey };
}

export const getTrendingMerchants = async (
  options?: RequestInit,
): Promise<Merchant[]> => {
  return customFetch<Merchant[]>("/merchants/trending", {
    ...options,
    method: "GET",
  });
};

export function useGetTrendingMerchants<
  TData = Awaited<ReturnType<typeof getTrendingMerchants>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getTrendingMerchants>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/merchants/trending"];
  const queryFn = () => getTrendingMerchants(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}
