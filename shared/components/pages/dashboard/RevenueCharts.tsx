"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "../../alerts/skeleton";
import { useGetRevenueChart, useGetTopProducts } from "@/apis";
import { useTranslations } from "next-intl";

function RevenueCharts() {
  const t = useTranslations("Dashboard.Home");

  const { data: chartData, isLoading: isLoadingChart } = useGetRevenueChart({
    query: { queryKey: ["/dashboard/revenue"] },
  });

  const { data: topProducts, isLoading: isLoadingProducts } = useGetTopProducts(
    {
      query: { queryKey: ["/dashboard/top-products"] },
    },
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{t("revenueOverTime")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {isLoadingChart ? (
              <Skeleton className="h-full w-full" />
            ) : chartData && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    tickFormatter={(val) =>
                      new Date(val).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                    }}
                    formatter={(value: number) => [`$${value}`, t("revenue")]}
                    labelFormatter={(label) =>
                      new Date(label).toLocaleDateString()
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                {t("noData")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Action Items */}
        <Card className="border-primary bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> {t("aiInsights")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="bg-background rounded-lg p-3 border">
              <p>
                <span className="font-semibold text-primary">
                  {t("trending")}
                </span>{" "}
                {t("trendingDesc")}
              </p>
            </div>
            <div className="bg-background rounded-lg p-3 border">
              <p>
                <span className="font-semibold">{t("inventoryAlert")}</span>{" "}
                {t("inventoryDesc")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("bestSelling")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingProducts
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))
              : topProducts?.slice(0, 4).map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-center gap-3"
                  >
                    <div className="h-10 w-10 rounded-md bg-muted overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.totalSold} {t("sold")}
                      </p>
                    </div>
                    <div className="font-semibold text-sm">
                      ${product.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RevenueCharts;
