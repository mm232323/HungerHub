/**
 * HealthStatus
 */
export interface HealthStatus {
  status: string;
}

/**
 * Category
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  /** @nullable */
  image?: string | null;
  productCount?: number;
}

/**
 * Merchant
 */
export interface Merchant {
  id: number;
  name: string;
  slug: string;
  coverImage: string;
  profileImage: string;
  bio: string;
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
  cuisineType: string;
  /** @nullable */
  address?: string | null;
  followersCount: number;
  isFollowing: boolean;
  isTrending?: boolean;
  tags?: string[];
}

/**
 * Product
 */
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
}

/**
 * ProductInput
 */
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
}

/**
 * ProductUpdate
 */
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
}

/**
 * FeedPostProduct
 */
export type FeedPostProduct = { [key: string]: unknown } | null;

/**
 * FeedPost
 */
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

/**
 * MerchantStory
 */
export interface MerchantStory {
  id: number;
  merchantId: number;
  merchant: Merchant;
  image: string;
  hasUnviewed: boolean;
}

/**
 * OrderStatus
 */
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderStatus = {
  pending: "pending",
  confirmed: "confirmed",
  preparing: "preparing",
  ready: "ready",
  delivering: "delivering",
  delivered: "delivered",
  cancelled: "cancelled",
} as const;

/**
 * OrderItem
 */
export interface OrderItem {
  productId: number;
  productName: string;
  /** @nullable */
  productImage?: string | null;
  quantity: number;
  price: number;
}

/**
 * Order
 */
export interface Order {
  id: number;
  merchantId: number;
  /** @nullable */
  merchantName?: string | null;
  /** @nullable */
  customerId?: number | null;
  /** @nullable */
  customerName?: string | null;
  /** @nullable */
  customerPhone?: string | null;
  items: OrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  total: number;
  status: OrderStatus;
  address: string;
  paymentMethod: string;
  /** @nullable */
  promoCode?: string | null;
  /** @nullable */
  discount?: number | null;
  /** @nullable */
  estimatedDelivery?: string | null;
  /** @nullable */
  trackingStage?: number | null;
  /** @nullable */
  driverName?: string | null;
  /** @nullable */
  driverPhone?: string | null;
  /** @nullable */
  notes?: string | null;
  createdAt: string;
}

/**
 * OrderInputItemsItem
 */
export type OrderInputItemsItem = {
  productId: number;
  quantity: number;
};

/**
 * OrderInput
 */
export interface OrderInput {
  merchantId: number;
  items: OrderInputItemsItem[];
  address: string;
  paymentMethod: string;
  /** @nullable */
  promoCode?: string | null;
  /** @nullable */
  notes?: string | null;
}

/**
 * OrderStatusUpdateStatus
 */
export type OrderStatusUpdateStatus =
  (typeof OrderStatusUpdateStatus)[keyof typeof OrderStatusUpdateStatus];

export const OrderStatusUpdateStatus = {
  pending: "pending",
  confirmed: "confirmed",
  preparing: "preparing",
  ready: "ready",
  delivering: "delivering",
  delivered: "delivered",
  cancelled: "cancelled",
} as const;

/**
 * OrderStatusUpdate
 */
export interface OrderStatusUpdate {
  status: OrderStatusUpdateStatus;
}

/**
 * Review
 */
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

/**
 * ReviewInput
 */
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

/**
 * FollowStatus
 */
export interface FollowStatus {
  isFollowing: boolean;
  followersCount: number;
}

/**
 * LikeStatus
 */
export interface LikeStatus {
  isLiked: boolean;
  likes: number;
}

/**
 * SaveStatus
 */
export interface SaveStatus {
  isSaved: boolean;
}

/**
 * SearchResults
 */
export interface SearchResults {
  merchants: Merchant[];
  products: Product[];
}

/**
 * DashboardStats
 */
export interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  todayOrders: number;
  pendingOrders: number;
  totalOrders: number;
  totalCustomers: number;
  newCustomersThisWeek: number;
  avgOrderValue: number;
  growthRate: number;
}

/**
 * RevenueDataPoint
 */
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

/**
 * CustomerAnalyticsTopOrderTimesItem
 */
export type CustomerAnalyticsTopOrderTimesItem = {
  hour: number;
  count: number;
};

/**
 * CustomerAnalyticsOrderHeatmapItem
 */
export type CustomerAnalyticsOrderHeatmapItem = {
  day: string;
  hour: number;
  count: number;
};

/**
 * CustomerAnalyticsDemographicsItem
 */
export type CustomerAnalyticsDemographicsItem = {
  label: string;
  value: number;
};

/**
 * CustomerAnalytics
 */
export interface CustomerAnalytics {
  retentionRate: number;
  repeatBuyerRate: number;
  totalCustomers: number;
  newCustomers: number;
  topOrderTimes: CustomerAnalyticsTopOrderTimesItem[];
  orderHeatmap: CustomerAnalyticsOrderHeatmapItem[];
  demographics?: CustomerAnalyticsDemographicsItem[];
}

/**
 * TopProduct
 */
export interface TopProduct {
  productId: number;
  name: string;
  image: string;
  totalSold: number;
  revenue: number;
  rank: number;
}

/**
 * PromotionType
 */
export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType];

export const PromotionType = {
  percentage: "percentage",
  fixed: "fixed",
  free_delivery: "free_delivery",
  bogo: "bogo",
} as const;

/**
 * Promotion
 */
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

/**
 * PromotionInputType
 */
export type PromotionInputType =
  (typeof PromotionInputType)[keyof typeof PromotionInputType];

export const PromotionInputType = {
  percentage: "percentage",
  fixed: "fixed",
  free_delivery: "free_delivery",
  bogo: "bogo",
} as const;

/**
 * PromotionInput
 */
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

/**
 * ListMerchantsParams
 */
export type ListMerchantsParams = {
  category?: string;
  trending?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
};

/**
 * ListProductsParams
 */
export type ListProductsParams = {
  category?: string;
  search?: string;
  merchantId?: number;
  limit?: number;
  offset?: number;
};

/**
 * GetFeedParams
 */
export type GetFeedParams = {
  limit?: number;
  offset?: number;
};

/**
 * ListOrdersParams
 */
export type ListOrdersParams = {
  status?: string;
  merchantId?: number;
};

/**
 * SearchParams
 */
export type SearchParams = {
  q: string;
};

/**
 * GetDashboardOrdersParams
 */
export type GetDashboardOrdersParams = {
  status?: string;
};
