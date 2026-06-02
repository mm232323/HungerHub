import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../../alerts/skeleton";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
 function StatCard({
    title,
    value,
    icon,
    trend,
    loading,
    className = "",
    t,
  }: any) {
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
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> {trend}%
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" /> {Math.abs(trend)}%
                </span>
              )}
              <span className="ml-1">{t("fromLastMonth")}</span>
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

export default StatCard;
