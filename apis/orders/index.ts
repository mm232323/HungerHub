import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  ListOrdersParams,
  Order,
  OrderInput,
  OrderStatusUpdate,
} from "@/types";
import type { ErrorType } from "@/types/api-fetch";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { customFetch } from "@/utils/customFetch";
import type { SecondParameter } from "@/utils/ts-helpers";

export const listOrders = async (
  params?: ListOrdersParams,
  options?: RequestInit,
): Promise<Order[]> => {
  return customFetch<Order[]>(
    `/orders${buildQueryParams(params)}`,
    { ...options, method: "GET" },
  );
};

export function useListOrders<
  TData = Awaited<ReturnType<typeof listOrders>>,
  TError = ErrorType<unknown>,
>(
  params?: ListOrdersParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof listOrders>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [
    "/orders",
    ...(params ? [params] : []),
  ];
  const queryFn = () => listOrders(params, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const createOrder = async (
  data: OrderInput,
  options?: RequestInit,
): Promise<Order> => {
  return customFetch<Order>("/orders", {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
};

export function useCreateOrder<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createOrder>>,
    TError,
    { data: OrderInput },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof createOrder>>,
  TError,
  { data: OrderInput },
  TContext
> {
  const mutationFn = ({ data }: { data: OrderInput }) =>
    createOrder(data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const getOrder = async (
  id: number,
  options?: RequestInit,
): Promise<Order> => {
  return customFetch<Order>(`/orders/${id}`, { ...options, method: "GET" });
};

export function useGetOrder<
  TData = Awaited<ReturnType<typeof getOrder>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrder>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/orders/${id}`];
  const queryFn = () => getOrder(id, options?.request);
  const query = useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
    ...options?.query,
  }) as any;
  return { ...query, queryKey };
}

export const updateOrderStatus = async (
  id: number,
  data: OrderStatusUpdate,
  options?: RequestInit,
): Promise<Order> => {
  return customFetch<Order>(`/orders/${id}/status`, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export function useUpdateOrderStatus<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateOrderStatus>>,
    TError,
    { id: number; data: OrderStatusUpdate },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof updateOrderStatus>>,
  TError,
  { id: number; data: OrderStatusUpdate },
  TContext
> {
  const mutationFn = ({
    id,
    data,
  }: {
    id: number;
    data: OrderStatusUpdate;
  }) => updateOrderStatus(id, data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}
