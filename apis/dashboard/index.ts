import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  CustomerAnalytics,
  DashboardStats,
  GetDashboardOrdersParams,
  Order,
  Product,
  ProductInput,
  Promotion,
  PromotionInput,
  RevenueDataPoint,
  TopProduct,
  Merchant,
} from "@/types";
import type { ErrorType } from "@/types/api-fetch";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { customFetch } from "@/utils/customFetch";
import type { SecondParameter } from "@/utils/ts-helpers";

export const getDashboardProducts = async (
  options?: RequestInit,
): Promise<Product[]> => {
  return customFetch<Product[]>("/dashboard/products", {
    ...options,
    method: "GET",
  });
};

export function useGetDashboardProducts<
  TData = Awaited<ReturnType<typeof getDashboardProducts>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getDashboardProducts>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/products"];
  const queryFn = () => getDashboardProducts(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const createProduct = async (
  data: ProductInput,
  options?: RequestInit,
): Promise<Product> => {
  return customFetch<Product>("/dashboard/products", {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(data),
  });
};

export function useCreateProduct<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createProduct>>,
    TError,
    { data: ProductInput },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof createProduct>>,
  TError,
  { data: ProductInput },
  TContext
> {
  const mutationFn = ({ data }: { data: ProductInput }) =>
    createProduct(data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const deleteProduct = async (
  id: number,
  options?: RequestInit,
): Promise<void> => {
  return customFetch<void>(`/dashboard/products/${id}`, {
    ...options,
    method: "DELETE",
  });
};

export function useDeleteProduct<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteProduct>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteProduct>>,
  TError,
  { id: number },
  TContext
> {
  const mutationFn = ({ id }: { id: number }) =>
    deleteProduct(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const getCustomerAnalytics = async (
  options?: RequestInit,
): Promise<CustomerAnalytics> => {
  return customFetch<CustomerAnalytics>("/dashboard/analytics", {
    ...options,
    method: "GET",
  });
};

export function useGetCustomerAnalytics<
  TData = Awaited<ReturnType<typeof getCustomerAnalytics>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getCustomerAnalytics>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/analytics"];
  const queryFn = () => getCustomerAnalytics(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getDashboardStats = async (
  options?: RequestInit,
): Promise<DashboardStats> => {
  return customFetch<DashboardStats>("/dashboard/stats", {
    ...options,
    method: "GET",
  });
};

export function useGetDashboardStats<
  TData = Awaited<ReturnType<typeof getDashboardStats>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getDashboardStats>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/stats"];
  const queryFn = () => getDashboardStats(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getRevenueChart = async (
  options?: RequestInit,
): Promise<RevenueDataPoint[]> => {
  return customFetch<RevenueDataPoint[]>("/dashboard/revenue", {
    ...options,
    method: "GET",
  });
};

export function useGetRevenueChart<
  TData = Awaited<ReturnType<typeof getRevenueChart>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getRevenueChart>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/revenue"];
  const queryFn = () => getRevenueChart(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getDashboardOrders = async (
  params?: GetDashboardOrdersParams,
  options?: RequestInit,
): Promise<Order[]> => {
  return customFetch<Order[]>(
    `/dashboard/orders${buildQueryParams(params)}`,
    { ...options, method: "GET" },
  );
};

export function useGetDashboardOrders<
  TData = Awaited<ReturnType<typeof getDashboardOrders>>,
  TError = ErrorType<unknown>,
>(
  params?: GetDashboardOrdersParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getDashboardOrders>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [
    "/dashboard/orders",
    ...(params ? [params] : []),
  ];
  const queryFn = () => getDashboardOrders(params, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getTopProducts = async (
  options?: RequestInit,
): Promise<TopProduct[]> => {
  return customFetch<TopProduct[]>("/dashboard/top-products", {
    ...options,
    method: "GET",
  });
};

export function useGetTopProducts<
  TData = Awaited<ReturnType<typeof getTopProducts>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getTopProducts>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/top-products"];
  const queryFn = () => getTopProducts(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const listPromotions = async (
  options?: RequestInit,
): Promise<Promotion[]> => {
  return customFetch<Promotion[]>("/dashboard/promotions", {
    ...options,
    method: "GET",
  });
};

export function useListPromotions<
  TData = Awaited<ReturnType<typeof listPromotions>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof listPromotions>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/promotions"];
  const queryFn = () => listPromotions(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const createPromotion = async (
  data: PromotionInput,
  options?: RequestInit,
): Promise<Promotion> => {
  return customFetch<Promotion>("/dashboard/promotions", {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(data),
  });
};

export function useCreatePromotion<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createPromotion>>,
    TError,
    { data: PromotionInput },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof createPromotion>>,
  TError,
  { data: PromotionInput },
  TContext
> {
  const mutationFn = ({ data }: { data: PromotionInput }) =>
    createPromotion(data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const updateProduct = async (
  id: number,
  data: ProductInput,
  options?: RequestInit,
): Promise<Product> => {
  return customFetch<Product>(`/dashboard/products/${id}`, {
    ...options,
    method: "PUT",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(data),
  });
};

export function useUpdateProduct<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateProduct>>,
    TError,
    { id: number, data: ProductInput },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof updateProduct>>,
  TError,
  { id: number, data: ProductInput },
  TContext
> {
  const mutationFn = ({ id, data }: { id: number, data: ProductInput }) =>
    updateProduct(id, data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const getMerchantProfile = async (
  options?: RequestInit,
): Promise<Merchant> => {
  return customFetch<Merchant>("/dashboard/merchant", {
    ...options,
    method: "GET",
  });
};

export function useGetMerchantProfile<
  TData = Awaited<ReturnType<typeof getMerchantProfile>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getMerchantProfile>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/merchant"];
  const queryFn = () => getMerchantProfile(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const updateMerchantProfile = async (
  data: Partial<Merchant>,
  options?: RequestInit,
): Promise<Merchant> => {
  return customFetch<Merchant>("/dashboard/merchant", {
    ...options,
    method: "PUT",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(data),
  });
};

export function useUpdateMerchantProfile<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateMerchantProfile>>,
    TError,
    { data: Partial<Merchant> },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof updateMerchantProfile>>,
  TError,
  { data: Partial<Merchant> },
  TContext
> {
  const mutationFn = ({ data }: { data: Partial<Merchant> }) =>
    updateMerchantProfile(data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}
