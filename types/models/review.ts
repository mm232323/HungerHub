/** Customer review on a merchant or product. */
export interface Review {
  id: number;
  merchantId: number;
  /** @nullable */
  productId?: number | null;
  /** @nullable */
  orderId?: number | null;
  reviewerName: string;
  /** @nullable */
  reviewerAvatar?: string | null;
  rating: number;
  comment: string;
  createdAt: string;
}

/** Body for submitting a review. */
export interface ReviewInput {
  merchantId: number;
  /** @nullable */
  productId?: number | null;
  /** @nullable */
  orderId?: number | null;
  reviewerName: string;
  rating: number;
  comment: string;
}
