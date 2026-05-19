import { useGetDashboardStats, useGetRevenueChart, useGetDashboardOrders, useGetTopProducts } from "@/utils/api";
import DashboardLayout from "../layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/alerts/skeleton";
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users, TrendingUp, Clock } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";

export default function DashboardHome() {
  const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats({
    query: { queryKey: ["/dashboard/stats"] }
  });

  const { data: chartData, isLoading: isLoadingChart } = useGetRevenueChart({
    query: { queryKey: ["/dashboard/revenue"] }
  });

  const { data: pendingOrders, isLoading: isLoadingOrders } = useGetDashboardOrders({ status: "pending" }, {
    query: { queryKey: ["/dashboard/orders", "pending"] }
  });

  const { data: topProducts, isLoading: isLoadingProducts } = useGetTopProducts({
    query: { queryKey: ["/dashboard/top-products"] }
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={stats ? `$${stats.totalRevenue.toLocaleString()}` : ""}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            trend={stats?.growthRate}
            loading={isLoadingStats}
          />
          <StatCard
            title="Today's Orders"
            value={stats?.todayOrders.toString() || ""}
            icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
            trend={12.5}
            loading={isLoadingStats}
          />
          <StatCard
            title="Pending Orders"
            value={stats?.pendingOrders.toString() || ""}
            icon={<Clock className="h-4 w-4 text-primary" />}
            loading={isLoadingStats}
            className="border-primary/50 bg-primary/5"
          />
          <StatCard
            title="Total Customers"
            value={stats?.totalCustomers.toLocaleString() || ""}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            trend={4.3}
            loading={isLoadingStats}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {isLoadingChart ? (
                  <Skeleton className="h-full w-full" />
                ) : chartData && chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(val) => `$${val}`}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        formatter={(value: number) => [`$${value}`, "Revenue"]}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
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
                  <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Action Items */}
            <Card className="border-primary bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="bg-background rounded-lg p-3 border">
                  <p><span className="font-semibold text-primary">Trending:</span> Spicy Wagyu Burger sales are up 45% this week. Consider running a weekend promo.</p>
                </div>
                <div className="bg-background rounded-lg p-3 border">
                  <p><span className="font-semibold">Inventory Alert:</span> Truffle oil is running low based on current order volume.</p>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Best Selling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingProducts ? (
                  Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
                ) : topProducts?.slice(0, 4).map((product) => (
                  <div key={product.productId} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.totalSold} sold</p>
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
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, trend, loading, className = "" }: any) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {trend !== undefined && !loading && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {trend > 0 ? (
              <span className="text-emerald-500 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" /> {trend}%</span>
            ) : (
              <span className="text-red-500 flex items-center"><ArrowDownRight className="h-3 w-3 mr-1" /> {Math.abs(trend)}%</span>
            )}
            <span className="ml-1">from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}