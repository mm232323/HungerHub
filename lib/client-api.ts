import type { Review } from "@/types";

const baseUrl = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8080/api/v1"
).replace(/\/+$/, "");

export async function submitReview(data: { merchantId: number; productId?: number; orderId?: number; reviewerName: string; rating: number; comment: string }): Promise<Review | null> {
  const url = `${baseUrl}/reviews`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to submit review: ${res.status} ${text}`);
  }

  return res.json() as Promise<Review>;
}
