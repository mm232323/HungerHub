"use client";

import { useState } from "react";
import { useListOrders, useUpdateOrderStatus } from "@/utils/api";
import { DashboardShell } from "@/shared/components/pages/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/alerts/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  User,
  RefreshCw,
  CheckCircle2,
  ChefHat,
  Bike,
  PackageCheck,
  Bell,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useTranslations } from "next-intl";
import { useOrderStages } from "./data";
import OrdersTabHeader from "./OrdersTabHeader";
import OrderStage from "./OrderStage";

export function DashboardOrdersView() {
  const t = useTranslations("Dashboard.Orders");
  const STAGES = useOrderStages();
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = (refreshing: boolean) => {
    setRefreshing(refreshing);
  };
  const {
    data: orders,
    isLoading,
    refetch,
  } = useListOrders(
    {},
    {
      query: { queryKey: ["/orders"] },
    },
  );

  const updateStatus = useUpdateOrderStatus({
    mutation: {
      onSuccess: () => {
        toast({ title: "Order updated" });
        refetch();
      },
    },
  });

  const activeOrders = orders?.filter((o) => o.status !== "delivered") ?? [];
  const totalActive = activeOrders.length;

  return (
    <>
      {/* Full-height flex column, no overflow on the outer wrapper */}
      <div className="h-screen flex flex-col overflow-hidden bg-stone-50">
        {/* ── Header ── */}
        <OrdersTabHeader
          isLoading={isLoading}
          totalActive={totalActive}
          refreshing={refreshing}
          refresh={refetch}
          onToggleRefresh={handleRefresh}
        />

        {/* ── Kanban board ── fills remaining height ── */}
        <div className="flex-1 overflow-hidden p-3 sm:p-5 min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 h-full">
            {STAGES.map((stage) => {
              const stageOrders =
                orders?.filter((o) => o.status === stage.id) ?? [];

              return (
                <OrderStage
                  key={stage.id}
                  stage={stage}
                  refetch={refetch}
                  stageOrders={stageOrders}
                  isLoading={isLoading}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
