export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType];

export const PromotionType = {
  percentage: "percentage",
  fixed: "fixed",
  free_delivery: "free_delivery",
  bogo: "bogo",
} as const;

export interface Promotion {
  id: number;
  title: string;
  type: PromotionType;
  discount: number;
  /** @nullable */
  code?: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount?: number;
  /** @nullable */
  impressions?: number | null;
}

export type PromotionInputType =
  (typeof PromotionInputType)[keyof typeof PromotionInputType];

export const PromotionInputType = {
  percentage: "percentage",
  fixed: "fixed",
  free_delivery: "free_delivery",
  bogo: "bogo",
} as const;

export interface PromotionInput {
  title: string;
  type: PromotionInputType;
  discount: number;
  /** @nullable */
  code?: string | null;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}
