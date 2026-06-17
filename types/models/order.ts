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

export interface OrderItem {
  productId: number;
  productName: string;
  /** @nullable */
  productImage?: string | null;
  quantity: number;
  price: number;
}

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

export type OrderInputItemsItem = {
  productId: number;
  quantity: number;
};

export interface OrderInput {
  merchantId: number;
  items: OrderInputItemsItem[];
  address: string;
  paymentMethod: string;
  /** @nullable */
  promoCode?: string | null;
  /** @nullable */
  notes?: string | null;
  customerName?: string;
  customerPhone?: string;
  deliveryFee?: number;
}

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

export interface OrderStatusUpdate {
  status: OrderStatusUpdateStatus;
}

/** Query string for `GET /orders`. */
export type ListOrdersParams = {
  status?: string;
  merchantId?: number;
};

/** Query string for `GET /dashboard/orders`. */
export type GetDashboardOrdersParams = {
  status?: string;
};
