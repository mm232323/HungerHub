import type { Merchant } from "./merchant";

/** Embedded product snapshot on a feed post (API may return a loose object). */
export type FeedPostProduct = { [key: string]: unknown } | null;

export interface FeedPost {
  id: number;
  merchantId: number;
  merchant: Merchant;
  /** @nullable */
  productId?: number | null;
  /** @nullable */
  product?: FeedPostProduct;
  image: string;
  /** @nullable */
  video?: string | null;
  caption: string;
  likes: number;
  comments?: number;
  shares?: number;
  isTrending: boolean;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
}

export interface MerchantStory {
  id: number;
  merchantId: number;
  merchant: Merchant;
  image: string;
  hasUnviewed: boolean;
}

/** Query string for `GET /feed`. */
export type GetFeedParams = {
  limit?: number;
  offset?: number;
};

/** Response from `POST /feed/posts/:id/like`. */
export interface LikeStatus {
  isLiked: boolean;
  likes: number;
}

/** Response from `POST /feed/posts/:id/save`. */
export interface SaveStatus {
  isSaved: boolean;
}
