import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Heart, Star, Users, ArrowUpRight } from "lucide-react";
import { CustomerAnalytics } from "@/types";
import { useTranslations } from "next-intl";

function AnalysisCards({
  analytics,
}: {
  analytics: CustomerAnalytics | undefined;
}) {
  const t = useTranslations("Dashboard.Analytics");
  
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
              people
            </p>
          </div>
          <div className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            + {Math.min(100, Math.max(1, Math.round((analytics?.newCustomers || 0) / ((analytics?.totalCustomers || 1) - (analytics?.newCustomers || 0)) * 100)))}% 
            <ArrowUpRight className="ml-1 h-3 w-3" />
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
          <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
            + 5% 
            <ArrowUpRight className="ml-1 h-3 w-3" />
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
              people
            </p>
          </div>
          <div className="flex items-center text-sm font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
            + 12% 
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalysisCards;
