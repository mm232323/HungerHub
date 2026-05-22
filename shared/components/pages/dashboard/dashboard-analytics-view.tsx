"use client";

import { useGetCustomerAnalytics } from "@/utils/api";
import { DashboardShell } from "@/shared/components/pages/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/alerts/skeleton";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Users, Heart, Star } from "lucide-react";

export function DashboardAnalyticsView() {
  const { data: analytics, isLoading } = useGetCustomerAnalytics({
    query: { queryKey: ["/dashboard/analytics"] }
  });

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Analytics</h1>
          <p className="text-muted-foreground mt-1">Understand your audience and their buying habits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
              <Heart className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-20" /> : (
                <div className="text-3xl font-bold">{analytics?.retentionRate}%</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Customers who ordered again</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Repeat Buyers</CardTitle>
              <Star className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-20" /> : (
                <div className="text-3xl font-bold">{analytics?.repeatBuyerRate}%</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">3+ orders all-time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-20" /> : (
                <div className="text-3xl font-bold">{analytics?.newCustomers}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Acquired this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Busiest Hours</CardTitle>
              <CardDescription>When do customers order the most?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                {isLoading ? <Skeleton className="h-full w-full" /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics?.topOrderTimes}>
                      <XAxis
                        dataKey="hour"
                        tickFormatter={(val) => `${val}:00`}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        formatter={(value: number) => [`${value} orders`, "Orders"]}
                        labelFormatter={(label) => `${label}:00`}
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Breakdown by segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4 flex items-center justify-center">
                {isLoading ? <Skeleton className="h-[250px] w-[250px] rounded-full" /> : (
                  analytics?.demographics ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics.demographics}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {analytics.demographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center">
                      <Users className="h-12 w-12 mb-2 opacity-20" />
                      <p>Not enough data to display demographics</p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}