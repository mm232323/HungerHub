"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useTranslations } from "next-intl";
import { CustomerAnalytics } from "@/types";
import { useGetRevenueChart, useGetTopProducts, useGetCustomerAnalytics } from "@/apis";
import { Skeleton } from "../../alerts/skeleton";
import { CircleDot, Target, Search } from "lucide-react";

function AnalysisCharts() {
  const t = useTranslations("Dashboard.Analytics");
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetCustomerAnalytics({
    query: { queryKey: ["/dashboard/analytics"] },
  });
  const { data: revenueData, isLoading: isLoadingRevenue } = useGetRevenueChart({
    query: { queryKey: ["/dashboard/revenue"] },
  });
  const { data: topProducts, isLoading: isLoadingProducts } = useGetTopProducts({
    query: { queryKey: ["/dashboard/top-products"] },
  });

  const COLORS = [
    "#4ade80", // Emerald 400
    "#60a5fa", // Blue 400
    "#f472b6", // Pink 400
    "#fbbf24", // Amber 400
    "#a78bfa", // Purple 400
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Row: Line Chart and Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audience reach (Revenue over time) */}
        <Card className="lg:col-span-2 overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-700">{t("ordersOverTime")}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="h-[250px] w-full mt-2">
              {isLoadingRevenue ? (
                <Skeleton className="h-full w-full" />
              ) : revenueData && revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                      tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { day: "numeric", month: "numeric" })}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", background: "#ffffff" }}
                      formatter={(value: number) => [`${value}`, t("orders")]}
                      labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    />
                    <Area type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">{t("noData")}</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Geo / Top Products Donut Chart */}
        <Card className="overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-700">{t("topProducts")}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 relative flex flex-col items-center">
            <div className="h-[200px] w-full relative flex items-center justify-center">
              {isLoadingProducts ? (
                <Skeleton className="h-40 w-40 rounded-full" />
              ) : topProducts && topProducts.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topProducts.slice(0, 4)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="totalSold"
                        stroke="none"
                        cornerRadius={4}
                      >
                        {topProducts.slice(0, 4).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-gray-800">
                      {topProducts.reduce((sum, p) => sum + p.totalSold, 0)}
                    </span>
                    <span className="text-xs text-gray-500">{t("totalSold")}</span>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground text-sm">{t("noData")}</div>
              )}
            </div>
            {/* Legend for Top 3 */}
            <div className="w-full mt-4 space-y-2 px-2">
                {topProducts?.slice(0, 3).map((p, i) => (
                  <div key={p.productId} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                        <span className="text-gray-600 truncate max-w-[100px]">{p.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{p.totalSold} {t("items")}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Bar Chart and Legend Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gender / Age (Orders by Hour) */}
        <Card className="lg:col-span-2 overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-700">{t("ordersByHour")}</CardTitle>
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-300" /> {t("orders")}</div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="h-[200px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics?.topOrderTimes}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(val) => `${val}:00`}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                    <Tooltip
                      cursor={{ fill: "#f3f4f6" }}
                      contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                      formatter={(value: number) => [`${value} ${t("orders")}`, t("orders")]}
                      labelFormatter={(label) => `${label}:00`}
                    />
                    <Bar dataKey="count" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lists & Mini Chart */}
        <div className="flex flex-col gap-4">
          <Card className="overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm flex-1">
            <CardContent className="p-5 flex flex-col gap-4 h-full justify-center">
              {/* Fake list items similar to Organic Search / Foursquare */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 transition-transform group-hover:scale-110">
                    <Search className="w-5 h-5" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                      <p className="text-xs text-gray-500">{t("searchDiscovery")}</p>
                      <p className="text-sm font-semibold text-gray-800">{t("organicTraffic")}</p>
                  </div>
                  <span className="font-bold text-gray-700">{analytics?.organicTrafficPercentage || 0}%</span>
                </div>
              </div>
              <div className="h-[1px] bg-gray-100 w-full my-1" />
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 transition-transform group-hover:scale-110">
                    <Target className="w-5 h-5" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                      <p className="text-xs text-gray-500">{t("socialCampaign")}</p>
                      <p className="text-sm font-semibold text-gray-800">{t("directLink")}</p>
                  </div>
                  <span className="font-bold text-gray-700">{analytics?.socialTrafficPercentage || 0}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mini Radial Legend */}
          <Card className="overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
             <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                       {/* SVG Circle to mimic radial progress */}
                       <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-purple-500" strokeWidth="4" strokeDasharray={`${analytics?.retentionRate || 0}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                       </svg>
                       <span className="absolute text-xs font-bold text-gray-700">{analytics?.retentionRate || 0}%</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{t("retention")}</span>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-md ${
                    (analytics?.retentionDelta || 0) >= 0 ? "text-purple-600 bg-purple-50" : "text-rose-600 bg-rose-50"
                }`}>
                    {(analytics?.retentionDelta || 0) > 0 ? "+" : ""}{analytics?.retentionDelta || 0}%
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AnalysisCharts;
