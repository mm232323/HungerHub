import { useState } from "react";
import { useListOrders, useUpdateOrderStatus } from "@workspace/api-client-react";
import { DashboardLayout } from "./layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Clock, User, RefreshCw, CheckCircle2, ChefHat, Bike, PackageCheck, Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const STAGES = [
  {
    id: "pending",
    label: "New",
    dot: "bg-orange-400",
    ring: "ring-orange-200",
    header: "bg-orange-50 border-orange-100",
    label_color: "text-orange-700",
    badge_bg: "bg-orange-100 text-orange-700",
    action: { label: "Accept", next: "confirmed", variant: "default" as const },
    icon: <Bell className="h-3.5 w-3.5" />,
  },
  {
    id: "confirmed",
    label: "Confirmed",
    dot: "bg-blue-400",
    ring: "ring-blue-200",
    header: "bg-blue-50 border-blue-100",
    label_color: "text-blue-700",
    badge_bg: "bg-blue-100 text-blue-700",
    action: { label: "Send to Kitchen", next: "preparing", variant: "default" as const },
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  {
    id: "preparing",
    label: "Kitchen",
    dot: "bg-purple-400",
    ring: "ring-purple-200",
    header: "bg-purple-50 border-purple-100",
    label_color: "text-purple-700",
    badge_bg: "bg-purple-100 text-purple-700",
    action: { label: "Mark Ready", next: "ready", variant: "default" as const },
    icon: <ChefHat className="h-3.5 w-3.5" />,
  },
  {
    id: "ready",
    label: "Ready",
    dot: "bg-emerald-400",
    ring: "ring-emerald-200",
    header: "bg-emerald-50 border-emerald-100",
    label_color: "text-emerald-700",
    badge_bg: "bg-emerald-100 text-emerald-700",
    action: { label: "Hand Off", next: "delivering", variant: "default" as const },
    icon: <PackageCheck className="h-3.5 w-3.5" />,
  },
  {
    id: "delivering",
    label: "Delivering",
    dot: "bg-indigo-400",
    ring: "ring-indigo-200",
    header: "bg-indigo-50 border-indigo-100",
    label_color: "text-indigo-700",
    badge_bg: "bg-indigo-100 text-indigo-700",
    action: { label: "Complete", next: "delivered", variant: "outline" as const },
    icon: <Bike className="h-3.5 w-3.5" />,
  },
];

export default function DashboardOrders() {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const { data: orders, isLoading, refetch } = useListOrders({}, {
    query: { queryKey: ["/api/orders"] }
  });

  const updateStatus = useUpdateOrderStatus({
    mutation: {
      onSuccess: () => {
        toast({ title: "Order updated" });
        refetch();
      }
    }
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const activeOrders = orders?.filter(o => o.status !== "delivered") ?? [];
  const totalActive = activeOrders.length;

  return (
    <DashboardLayout>
      {/* Full-height flex column, no overflow on the outer wrapper */}
      <div className="h-screen flex flex-col overflow-hidden bg-stone-50">

        {/* ── Header ── */}
        <div className="shrink-0 px-6 py-4 bg-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">Live Orders</h1>
              <p className="text-sm text-stone-400 mt-0.5">
                {isLoading ? "Loading…" : `${totalActive} active order${totalActive !== 1 ? "s" : ""} in pipeline`}
              </p>
            </div>
            {totalActive > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
                {totalActive} active
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}
            className="gap-2 text-stone-500 border-stone-200 hover:text-stone-900">
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* ── Kanban board ── fills remaining height, no x-scroll ── */}
        <div className="flex-1 overflow-hidden p-5 min-h-0">
          <div className="grid grid-cols-5 gap-4 h-full">
            {STAGES.map(stage => {
              const stageOrders = orders?.filter(o => o.status === stage.id) ?? [];

              return (
                <div key={stage.id}
                  className={`flex flex-col min-h-0 rounded-2xl border bg-white overflow-hidden shadow-sm`}>

                  {/* Column header */}
                  <div className={`shrink-0 px-4 py-3 border-b ${stage.header} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${stage.dot}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${stage.label_color}`}>
                        {stage.label}
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage.badge_bg}`}>
                      {stageOrders.length}
                    </span>
                  </div>

                  {/* Cards — scroll within column */}
                  <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-2.5">
                    {isLoading ? (
                      Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 w-full rounded-xl" />
                      ))
                    ) : stageOrders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-20 text-stone-300 gap-1">
                        <div className={`${stage.label_color} opacity-20`}>{stage.icon}</div>
                        <p className="text-[11px] font-medium text-stone-300">Empty</p>
                      </div>
                    ) : stageOrders.map(order => (
                      <div key={order.id}
                        className="bg-white border border-stone-100 rounded-xl p-3.5 shadow-sm hover:shadow-md hover:border-stone-200 transition-all group">

                        {/* Top row */}
                        <div className="flex items-start justify-between mb-2.5">
                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">
                              #{order.id}
                            </span>
                            <div className="text-base font-black text-stone-900 leading-tight">
                              ${order.total.toFixed(2)}
                            </div>
                          </div>
                          <span className="flex items-center gap-1 text-[10px] text-stone-400 bg-stone-50 border border-stone-100 px-1.5 py-1 rounded-lg whitespace-nowrap">
                            <Clock className="h-2.5 w-2.5" />
                            {formatDistanceToNow(new Date(order.createdAt), { addSuffix: false })}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="border-l-2 border-orange-200 pl-2.5 mb-3 space-y-0.5">
                          {order.items.slice(0, 2).map((item, i) => (
                            <p key={i} className="text-[11px] text-stone-600 leading-snug">
                              <span className="font-bold text-stone-800">{item.quantity}×</span>{" "}
                              {item.productName}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-[10px] text-stone-400">+{order.items.length - 2} more</p>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-stone-50">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                              <User className="h-2.5 w-2.5 text-stone-500" />
                            </div>
                            <span className="text-[11px] font-medium text-stone-500 truncate max-w-[60px]">
                              {order.customerName}
                            </span>
                          </div>

                          {/* Action button */}
                          {stage.action && (
                            <button
                              onClick={() => updateStatus.mutate({
                                id: order.id,
                                data: { status: stage.action.next as any },
                              })}
                              className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                                stage.action.variant === "outline"
                                  ? "border border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300"
                                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-sm shadow-orange-200"
                              }`}
                            >
                              {stage.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
