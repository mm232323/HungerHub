import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  Category,
  CustomerAnalytics,
  DashboardStats,
  FeedPost,
  FollowStatus,
  GetDashboardOrdersParams,
  GetFeedParams,
  HealthStatus,
  LikeStatus,
  ListMerchantsParams,
  ListOrdersParams,
  ListProductsParams,
  Merchant,
  MerchantStory,
  Order,
  OrderInput,
  OrderStatusUpdate,
  Product,
  ProductInput,
  Promotion,
  PromotionInput,
  RevenueDataPoint,
  Review,
  SaveStatus,
  TopProduct,
} from "@/types";

// ---------------------------------------------------------------------------
// Custom Fetch Implementation (Direct replacement of custom-fetch.ts)
// ---------------------------------------------------------------------------

export type CustomFetchOptions = RequestInit & {
  responseType?: "json" | "text" | "blob" | "auto";
};

export type ErrorType<T = unknown> = ApiError<T>;

export type BodyType<T> = T;

export type AuthTokenGetter = () => Promise<string | null> | string | null;

let _baseUrl = "";
let _authTokenGetter: AuthTokenGetter | null = null;

export function setBaseUrl(url: string | null): void {
  _baseUrl = url ? url.replace(/\/+$/, "") : "";
}

export function setAuthTokenGetter(getter: AuthTokenGetter | null): void {
  _authTokenGetter = getter;
}

export class ApiError<T = unknown> extends Error {
  readonly name = "ApiError";
  readonly status: number;
  readonly statusText: string;
  readonly data: T | null;
  readonly headers: Headers;
  readonly response: Response;
  readonly method: string;
  readonly url: string;

  constructor(
    response: Response,
    data: T | null,
    requestInfo: { method: string; url: string },
  ) {
    super(`HTTP ${response.status} ${response.statusText}`);
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = response.status;
    this.statusText = response.statusText;
    this.data = data;
    this.headers = response.headers;
    this.response = response;
    this.method = requestInfo.method;
    this.url = response.url || requestInfo.url;
  }
}

export async function customFetch<T = unknown>(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<T> {
  const { responseType = "auto", headers: headersInit, ...init } = options;

  let url = typeof input === "string" ? input : (input as any).url || input.toString();
  if (_baseUrl && url.startsWith("/")) {
    url = `${_baseUrl}${url}`;
  }

  const method = (init.method || "GET").toUpperCase();
  const headers = new Headers(headersInit);

  if (init.body != null && typeof init.body === "string" && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  if (responseType === "json" && !headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  if (_authTokenGetter && !headers.has("authorization")) {
    const token = await _authTokenGetter();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  }

  const requestInfo = { method, url };
  const response = await fetch(url, { ...init, method, headers });

  if (!response.ok) {
    let errorData: any = null;
    try {
      errorData = await response.json();
    } catch {
      try {
        errorData = await response.text();
      } catch { }
    }
    throw new ApiError(response, errorData, requestInfo);
  }

  if (response.status === 204) {
    return null as any;
  }

  if (responseType === "text") {
    return (await response.text()) as any;
  }

  if (responseType === "blob") {
    return (await response.blob()) as any;
  }

  return (await response.json()) as T;
}

// Helper types
type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];
type Awaited<O> = O extends PromiseLike<infer T> ? T : O;

function buildQueryParams(params?: Record<string, any>): string {
  if (!params) return "";
  const normalizedParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      normalizedParams.append(key, value.toString());
    }
  });
  const stringified = normalizedParams.toString();
  return stringified.length > 0 ? `?${stringified}` : "";
}

// ---------------------------------------------------------------------------
// 1. Health
// ---------------------------------------------------------------------------

export const healthCheck = async (options?: RequestInit): Promise<HealthStatus> => {
  return customFetch<HealthStatus>("/api/healthz", { ...options, method: "GET" });
};

// ---------------------------------------------------------------------------
// 2. Categories
// ---------------------------------------------------------------------------

export const listCategories = async (options?: RequestInit): Promise<Category[]> => {
  return customFetch<Category[]>("/categories", { ...options, method: "GET" });
};

export function useListCategories<
  TData = Awaited<ReturnType<typeof listCategories>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, TError, TData>;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/categories"];
  const queryFn = () => listCategories(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

// ---------------------------------------------------------------------------
// 3. Merchants
// ---------------------------------------------------------------------------

export const listMerchants = async (
  params?: ListMerchantsParams,
  options?: RequestInit,
): Promise<Merchant[]> => {
  return customFetch<Merchant[]>(`/merchants${buildQueryParams(params)}`, { ...options, method: "GET" });
};

export const getMerchant = async (id: number, options?: RequestInit): Promise<Merchant> => {
  return customFetch<Merchant>(`/merchants/${id}`, { ...options, method: "GET" });
};

export function useGetMerchant<
  TData = Awaited<ReturnType<typeof getMerchant>>,
  TError = ErrorType<void>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMerchant>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/merchants/${id}`];
  const queryFn = () => getMerchant(id, options?.request);
  const query = useQuery({ queryKey, queryFn, enabled: !!id, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const followMerchant = async (id: number, options?: RequestInit): Promise<FollowStatus> => {
  return customFetch<FollowStatus>(`/merchants/${id}/follow`, { ...options, method: "POST" });
};

export function useFollowMerchant<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof followMerchant>>, TError, { id: number }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof followMerchant>>, TError, { id: number }, TContext> {
  const mutationFn = ({ id }: { id: number }) => followMerchant(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const getMerchantProducts = async (id: number, options?: RequestInit): Promise<Product[]> => {
  return customFetch<Product[]>(`/merchants/${id}/products`, { ...options, method: "GET" });
};

export function useGetMerchantProducts<
  TData = Awaited<ReturnType<typeof getMerchantProducts>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMerchantProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/merchants/${id}/products`];
  const queryFn = () => getMerchantProducts(id, options?.request);
  const query = useQuery({ queryKey, queryFn, enabled: !!id, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getMerchantReviews = async (id: number, options?: RequestInit): Promise<Review[]> => {
  return customFetch<Review[]>(`/merchants/${id}/reviews`, { ...options, method: "GET" });
};

export function useGetMerchantReviews<
  TData = Awaited<ReturnType<typeof getMerchantReviews>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMerchantReviews>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/merchants/${id}/reviews`];
  const queryFn = () => getMerchantReviews(id, options?.request);
  const query = useQuery({ queryKey, queryFn, enabled: !!id, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getTrendingMerchants = async (options?: RequestInit): Promise<Merchant[]> => {
  return customFetch<Merchant[]>("/merchants/trending", { ...options, method: "GET" });
};

export function useGetTrendingMerchants<
  TData = Awaited<ReturnType<typeof getTrendingMerchants>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingMerchants>>, TError, TData>;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/merchants/trending"];
  const queryFn = () => getTrendingMerchants(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

// ---------------------------------------------------------------------------
// 4. Products
// ---------------------------------------------------------------------------

export const listProducts = async (
  params?: ListProductsParams,
  options?: RequestInit,
): Promise<Product[]> => {
  return customFetch<Product[]>(`/products${buildQueryParams(params)}`, { ...options, method: "GET" });
};

export const getProduct = async (id: number, options?: RequestInit): Promise<Product> => {
  return customFetch<Product>(`/products/${id}`, { ...options, method: "GET" });
};

export function useGetProduct<
  TData = Awaited<ReturnType<typeof getProduct>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/products/${id}`];
  const queryFn = () => getProduct(id, options?.request);
  const query = useQuery({ queryKey, queryFn, enabled: !!id, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getTrendingProducts = async (options?: RequestInit): Promise<Product[]> => {
  return customFetch<Product[]>("/products/trending", { ...options, method: "GET" });
};

export function useGetTrendingProducts<
  TData = Awaited<ReturnType<typeof getTrendingProducts>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingProducts>>, TError, TData>;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/products/trending"];
  const queryFn = () => getTrendingProducts(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

// ---------------------------------------------------------------------------
// 5. Social Feed
// ---------------------------------------------------------------------------

export const getFeed = async (
  params?: GetFeedParams,
  options?: RequestInit,
): Promise<FeedPost[]> => {
  return customFetch<FeedPost[]>(`/feed${buildQueryParams(params)}`, { ...options, method: "GET" });
};

export function useGetFeed<
  TData = Awaited<ReturnType<typeof getFeed>>,
  TError = ErrorType<unknown>,
>(
  params?: GetFeedParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeed>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/feed", ...(params ? [params] : [])];
  const queryFn = () => getFeed(params, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getFeedStories = async (options?: RequestInit): Promise<MerchantStory[]> => {
  return customFetch<MerchantStory[]>("/feed/stories", { ...options, method: "GET" });
};

export function useGetFeedStories<
  TData = Awaited<ReturnType<typeof getFeedStories>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getFeedStories>>, TError, TData>;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/feed/stories"];
  const queryFn = () => getFeedStories(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const likeFeedPost = async (id: number, options?: RequestInit): Promise<LikeStatus> => {
  return customFetch<LikeStatus>(`/feed/posts/${id}/like`, { ...options, method: "POST" });
};

export function useLikeFeedPost<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof likeFeedPost>>, TError, { id: number }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof likeFeedPost>>, TError, { id: number }, TContext> {
  const mutationFn = ({ id }: { id: number }) => likeFeedPost(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const saveFeedPost = async (id: number, options?: RequestInit): Promise<SaveStatus> => {
  return customFetch<SaveStatus>(`/feed/posts/${id}/save`, { ...options, method: "POST" });
};

export function useSaveFeedPost<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof saveFeedPost>>, TError, { id: number }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof saveFeedPost>>, TError, { id: number }, TContext> {
  const mutationFn = ({ id }: { id: number }) => saveFeedPost(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

// ---------------------------------------------------------------------------
// 6. Orders
// ---------------------------------------------------------------------------

export const listOrders = async (
  params?: ListOrdersParams,
  options?: RequestInit,
): Promise<Order[]> => {
  return customFetch<Order[]>(`/orders${buildQueryParams(params)}`, { ...options, method: "GET" });
};

export function useListOrders<
  TData = Awaited<ReturnType<typeof listOrders>>,
  TError = ErrorType<unknown>,
>(
  params?: ListOrdersParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/orders", ...(params ? [params] : [])];
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
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, { data: OrderInput }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof createOrder>>, TError, { data: OrderInput }, TContext> {
  const mutationFn = ({ data }: { data: OrderInput }) => createOrder(data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const getOrder = async (id: number, options?: RequestInit): Promise<Order> => {
  return customFetch<Order>(`/orders/${id}`, { ...options, method: "GET" });
};

export function useGetOrder<
  TData = Awaited<ReturnType<typeof getOrder>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [`/orders/${id}`];
  const queryFn = () => getOrder(id, options?.request);
  const query = useQuery({ queryKey, queryFn, enabled: !!id, ...options?.query }) as any;
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
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateOrderStatus>>, TError, { id: number; data: OrderStatusUpdate }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof updateOrderStatus>>, TError, { id: number; data: OrderStatusUpdate }, TContext> {
  const mutationFn = ({ id, data }: { id: number; data: OrderStatusUpdate }) => updateOrderStatus(id, data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

// ---------------------------------------------------------------------------
// 7. Merchant Dashboard Product Management
// ---------------------------------------------------------------------------

export const getDashboardProducts = async (options?: RequestInit): Promise<Product[]> => {
  return customFetch<Product[]>("/dashboard/products", { ...options, method: "GET" });
};

export function useGetDashboardProducts<
  TData = Awaited<ReturnType<typeof getDashboardProducts>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardProducts>>, TError, TData>;
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
    body: JSON.stringify(data),
  });
};

export function useCreateProduct<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProduct>>, TError, { data: ProductInput }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof createProduct>>, TError, { data: ProductInput }, TContext> {
  const mutationFn = ({ data }: { data: ProductInput }) => createProduct(data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const deleteProduct = async (id: number, options?: RequestInit): Promise<void> => {
  return customFetch<void>(`/dashboard/products/${id}`, { ...options, method: "DELETE" });
};

export function useDeleteProduct<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProduct>>, TError, { id: number }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof deleteProduct>>, TError, { id: number }, TContext> {
  const mutationFn = ({ id }: { id: number }) => deleteProduct(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

// ---------------------------------------------------------------------------
// 8. Analytics & Dashboard Data
// ---------------------------------------------------------------------------

export const getCustomerAnalytics = async (options?: RequestInit): Promise<CustomerAnalytics> => {
  return customFetch<CustomerAnalytics>("/dashboard/analytics", { ...options, method: "GET" });
};

export function useGetCustomerAnalytics<
  TData = Awaited<ReturnType<typeof getCustomerAnalytics>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getCustomerAnalytics>>, TError, TData>;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/analytics"];
  const queryFn = () => getCustomerAnalytics(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getDashboardStats = async (options?: RequestInit): Promise<DashboardStats> => {
  return customFetch<DashboardStats>("/dashboard/stats", { ...options, method: "GET" });
};

export function useGetDashboardStats<
  TData = Awaited<ReturnType<typeof getDashboardStats>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardStats>>, TError, TData>;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/stats"];
  const queryFn = () => getDashboardStats(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getRevenueChart = async (options?: RequestInit): Promise<RevenueDataPoint[]> => {
  return customFetch<RevenueDataPoint[]>("/dashboard/revenue", { ...options, method: "GET" });
};

export function useGetRevenueChart<
  TData = Awaited<ReturnType<typeof getRevenueChart>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getRevenueChart>>, TError, TData>;
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
  return customFetch<Order[]>(`/dashboard/orders${buildQueryParams(params)}`, { ...options, method: "GET" });
};

export function useGetDashboardOrders<
  TData = Awaited<ReturnType<typeof getDashboardOrders>>,
  TError = ErrorType<unknown>,
>(
  params?: GetDashboardOrdersParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/orders", ...(params ? [params] : [])];
  const queryFn = () => getDashboardOrders(params, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getTopProducts = async (options?: RequestInit): Promise<TopProduct[]> => {
  return customFetch<TopProduct[]>("/dashboard/top-products", { ...options, method: "GET" });
};

export function useGetTopProducts<
  TData = Awaited<ReturnType<typeof getTopProducts>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTopProducts>>, TError, TData>;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/dashboard/top-products"];
  const queryFn = () => getTopProducts(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

// ---------------------------------------------------------------------------
// 9. Promotions & Marketing
// ---------------------------------------------------------------------------

export const listPromotions = async (options?: RequestInit): Promise<Promotion[]> => {
  return customFetch<Promotion[]>("/dashboard/promotions", { ...options, method: "GET" });
};

export function useListPromotions<
  TData = Awaited<ReturnType<typeof listPromotions>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof listPromotions>>, TError, TData>;
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
    body: JSON.stringify(data),
  });
};

export function useCreatePromotion<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPromotion>>, TError, { data: PromotionInput }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<Awaited<ReturnType<typeof createPromotion>>, TError, { data: PromotionInput }, TContext> {
  const mutationFn = ({ data }: { data: PromotionInput }) => createPromotion(data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}
