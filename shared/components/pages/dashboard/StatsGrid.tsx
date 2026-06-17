"use client";

import React from "react";
import { Clock, DollarSign, ShoppingBag, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import StatCard from "./StatCard";
import { useGetDashboardStats } from "@/apis";

function StatsGrid() {
  const t = useTranslations("Dashboard.Home");
  const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats({
      query: { queryKey: ["/dashboard/stats"] },
    });
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title={t("totalRevenue")}
        value={stats ? `$${stats.totalRevenue.toLocaleString()}` : ""}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        trend={stats?.growthRate}
        loading={isLoadingStats}
        t={t}
      />
      <StatCard
        title={t("todaysOrders")}
        value={stats?.todayOrders.toString() || ""}
        icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
        trend={stats?.ordersGrowthRate}
        loading={isLoadingStats}
        t={t}
      />
      <StatCard
        title={t("pendingOrders")}
        value={stats?.pendingOrders.toString() || ""}
        icon={<Clock className="h-4 w-4 text-primary" />}
        loading={isLoadingStats}
        className="border-primary/50 bg-primary/5"
        t={t}
      />
      <StatCard
        title={t("totalCustomers")}
        value={stats?.totalCustomers.toLocaleString() || ""}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        trend={stats?.customersGrowthRate}
        loading={isLoadingStats}
        t={t}
      />
    </div>
  );
}

export default StatsGrid;
