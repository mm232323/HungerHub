/** Summary KPIs on the merchant dashboard home. */
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

/** Single point on the revenue chart. */
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export type CustomerAnalyticsTopOrderTimesItem = {
  hour: number;
  count: number;
};

export type CustomerAnalyticsOrderHeatmapItem = {
  day: string;
  hour: number;
  count: number;
};

export type CustomerAnalyticsDemographicsItem = {
  label: string;
  value: number;
};

/** Customer behavior analytics for the dashboard. */
export interface CustomerAnalytics {
  retentionRate: number;
  repeatBuyerRate: number;
  totalCustomers: number;
  newCustomers: number;
  topOrderTimes: CustomerAnalyticsTopOrderTimesItem[];
  orderHeatmap: CustomerAnalyticsOrderHeatmapItem[];
  demographics?: CustomerAnalyticsDemographicsItem[];
}

/** Row in the “top products” dashboard widget. */
export interface TopProduct {
  productId: number;
  name: string;
  image: string;
  totalSold: number;
  revenue: number;
  rank: number;
}
