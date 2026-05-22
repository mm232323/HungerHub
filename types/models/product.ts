/** Menu item returned by catalog and merchant endpoints. */
export interface Product {
  id: number;
  merchantId: number;
  /** @nullable */
  merchantName?: string | null;
  name: string;
  description: string;
  price: number;
  /** @nullable */
  discountPrice?: number | null;
  image: string;
  category: string;
  isAvailable: boolean;
  /** @nullable */
  stock?: number | null;
  ingredients?: string[];
  /** @nullable */
  nutritionalInfo?: string | null;
  isTrending?: boolean;
  /** @nullable */
  rating?: number | null;
  /** @nullable */
  reviewCount?: number | null;
  /** @nullable */
  preparationTime?: number | null;
  dietaryTags?: string[];
  customizations?: string[];
  /** @nullable */
  facebookUrl?: string | null;
  /** @nullable */
  instagramUrl?: string | null;
}

/** Body for creating or updating a product in the merchant dashboard. */
export interface ProductInput {
  name: string;
  description: string;
  price: number;
  /** @nullable */
  discountPrice?: number | null;
  image: string;
  category: string;
  isAvailable?: boolean;
  /** @nullable */
  stock?: number | null;
  ingredients?: string[];
  /** @nullable */
  nutritionalInfo?: string | null;
  /** @nullable */
  preparationTime?: number | null;
  dietaryTags?: string[];
  customizations?: string[];
  /** @nullable */
  facebookUrl?: string | null;
  /** @nullable */
  instagramUrl?: string | null;
}

/** Partial update payload for a product. */
export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  /** @nullable */
  discountPrice?: number | null;
  image?: string;
  category?: string;
  isAvailable?: boolean;
  /** @nullable */
  stock?: number | null;
  ingredients?: string[];
  /** @nullable */
  nutritionalInfo?: string | null;
  /** @nullable */
  preparationTime?: number | null;
  dietaryTags?: string[];
  customizations?: string[];
  /** @nullable */
  facebookUrl?: string | null;
  /** @nullable */
  instagramUrl?: string | null;
}

/** Query string for `GET /products`. */
export type ListProductsParams = {
  category?: string;
  search?: string;
  merchantId?: number;
  limit?: number;
  offset?: number;
};
