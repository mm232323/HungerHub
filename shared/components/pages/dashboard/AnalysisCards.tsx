"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Heart, Star, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useGetCustomerAnalytics } from "@/apis";
import { useTranslations } from "next-intl";

function AnalysisCards() {
  const t = useTranslations("Dashboard.Analytics");
  const { data: analytics, isLoading } = useGetCustomerAnalytics({
    query: { queryKey: ["/dashboard/analytics"] },
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Customers Card */}
      <Card className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-300/40 rounded-full blur-2xl pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
          <CardTitle className="text-sm font-semibold text-gray-700">
            {t("totalCustomers") || "Total Customers"}
          </CardTitle>
          <Users className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="z-10 relative flex justify-between items-end">
          <div>
            <div className="text-3xl font-bold text-gray-900">
              {analytics?.totalCustomers || 0}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {t("people")}
            </p>
          </div>
          <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-md ${analytics?.newCustomers && analytics?.totalCustomers && Math.round((analytics.newCustomers / (analytics.totalCustomers - analytics.newCustomers)) * 100) < 0 ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'}`}>
            {analytics?.newCustomers && analytics?.totalCustomers && Math.round((analytics.newCustomers / (analytics.totalCustomers - analytics.newCustomers)) * 100) < 0 ? '' : '+'} {Math.min(100, Math.max(1, Math.round((analytics?.newCustomers || 0) / ((analytics?.totalCustomers || 1) - (analytics?.newCustomers || 0)) * 100)))}% 
            {analytics?.newCustomers && analytics?.totalCustomers && Math.round((analytics.newCustomers / (analytics.totalCustomers - analytics.newCustomers)) * 100) < 0 ? <ArrowDownRight className="ml-1 h-3 w-3" /> : <ArrowUpRight className="ml-1 h-3 w-3" />}
          </div>
        </CardContent>
      </Card>

      {/* Repeat Buyers Card */}
      <Card className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-300/40 rounded-full blur-2xl pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
          <CardTitle className="text-sm font-semibold text-gray-700">
            {t("repeatBuyers") || "Repeat Buyers"}
          </CardTitle>
          <Star className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="z-10 relative flex justify-between items-end">
          <div>
            <div className="text-3xl font-bold text-gray-900">
              {analytics?.repeatBuyerRate || 0}%
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {t("repeatBuyersDesc")}
            </p>
          </div>
          <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-md ${(analytics?.retentionDelta || 0) < 0 ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50'}`}>
            {(analytics?.retentionDelta || 0) > 0 ? "+" : ""}{analytics?.retentionDelta || 0}% 
            {(analytics?.retentionDelta || 0) < 0 ? <ArrowDownRight className="ml-1 h-3 w-3" /> : <ArrowUpRight className="ml-1 h-3 w-3" />}
          </div>
        </CardContent>
      </Card>

      {/* New Customers Card */}
      <Card className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-rose-300/40 rounded-full blur-2xl pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
          <CardTitle className="text-sm font-semibold text-gray-700">
            {t("newCustomers") || "New Customers"}
          </CardTitle>
          <Heart className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="z-10 relative flex justify-between items-end">
          <div>
            <div className="text-3xl font-bold text-gray-900">
              {analytics?.newCustomers || 0}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {t("people")}
            </p>
          </div>
          <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-md ${(analytics?.newCustomersDelta || 0) < 0 ? 'text-red-600 bg-red-50' : 'text-rose-600 bg-rose-50'}`}>
            {(analytics?.newCustomersDelta || 0) > 0 ? "+" : ""}{analytics?.newCustomersDelta || 0}% 
            {(analytics?.newCustomersDelta || 0) < 0 ? <ArrowDownRight className="ml-1 h-3 w-3" /> : <ArrowUpRight className="ml-1 h-3 w-3" />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalysisCards;
