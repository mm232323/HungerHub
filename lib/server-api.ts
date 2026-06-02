import "server-only";

import type {
  Category,
  CustomerAnalytics,
  FeedPost,
  Merchant,
  MerchantStory,
  Order,
  Product,
  Promotion,
  Review,
} from "@/types";

const baseUrl = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Server API ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

/** Safe fetch: returns `null` on failure (network / non-OK). */
async function fetchJsonSafe<T>(path: string): Promise<T | null> {
  try {
    return await fetchJson<T>(path);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  return (await fetchJsonSafe<Category[]>("/categories")) ?? [];
}

export async function getPromotions(): Promise<Promotion[]> {
  return (await fetchJsonSafe<Promotion[]>("/promotions")) ?? [];
}
export async function GetAnalysis(): Promise<CustomerAnalytics> {
  return (await fetchJsonSafe<CustomerAnalytics>("/dashboard/analytics")) ?? {} as CustomerAnalytics;
}

export async function getTrendingMerchants(): Promise<Merchant[]> {
  return (await fetchJsonSafe<Merchant[]>("/merchants/trending")) ?? [];
}

export async function getTrendingProducts(): Promise<Product[]> {
  return (await fetchJsonSafe<Product[]>("/products/trending")) ?? [];
}

export async function getProducts(): Promise<Product[]> {
  return (await fetchJsonSafe<Product[]>("/products")) ?? [];
}

export async function getFeedStories(): Promise<MerchantStory[]> {
  return (await fetchJsonSafe<MerchantStory[]>("/feed/stories")) ?? [];
}

export async function getFeed(): Promise<FeedPost[]> {
  return (await fetchJsonSafe<FeedPost[]>("/feed")) ?? [];
}

export async function getProductById(id: number): Promise<Product | null> {
  if (!Number.isFinite(id) || id <= 0) return null;
  return fetchJsonSafe<Product>(`/products/${id}`);
}

export async function getMerchantById(id: number): Promise<Merchant | null> {
  if (!Number.isFinite(id) || id <= 0) return null;
  return fetchJsonSafe<Merchant>(`/merchants/${id}`);
}

export async function getMerchantProducts(id: number): Promise<Product[]> {
  if (!Number.isFinite(id) || id <= 0) return [];
  return (await fetchJsonSafe<Product[]>(`/merchants/${id}/products`)) ?? [];
}

export async function getMerchantReviews(id: number): Promise<Review[]> {
  if (!Number.isFinite(id) || id <= 0) return [];
  return (await fetchJsonSafe<Review[]>(`/merchants/${id}/reviews`)) ?? [];
}

export async function getOrderById(id: number): Promise<Order | null> {
  if (!Number.isFinite(id) || id <= 0) return null;
  return fetchJsonSafe<Order>(`/orders/${id}`);
}
