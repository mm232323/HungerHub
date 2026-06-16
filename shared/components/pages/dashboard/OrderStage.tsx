import { Clock, User } from "lucide-react";
import React, { JSX } from "react";
import { formatDistanceToNow } from "date-fns";
import { stageType } from "./data";
import { Skeleton } from "../../alerts/skeleton";
import { Order } from "@/types";
import { useUpdateOrderStatus } from "@/apis";
import { toast } from "@/hooks/use-toast";
import { useTranslations, useLocale } from "next-intl";
import { ar, enUS } from "date-fns/locale";
import { OrderDetailsModal } from "./order-details-modal";
import { useOrderStages } from "./data";

function OrderStage({
  stage,
  stageOrders,
  isLoading,
  refetch,
}: {
  stage: stageType;
  stageOrders: Order[];
  isLoading: boolean;
  refetch: () => void;
}) {
  const t = useTranslations("Dashboard.Orders");
  const toastT = useTranslations("Toasts");
  const locale = useLocale();
  const dateLocale = locale === "ar" ? ar : enUS;
  const allStages = useOrderStages();
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const updateStatus = useUpdateOrderStatus({
    mutation: {
      onSuccess: () => {
        toast({ title: toastT("orderUpdated") });
        refetch();
      },
    },
  });
  return (
    <div
      key={stage.id}
      className={`flex flex-col w-[280px] sm:w-[320px] shrink-0 min-h-0 rounded-2xl border bg-white overflow-hidden shadow-sm`}
    >
      {/* Column header */}
      <div
        className={`shrink-0 px-3 sm:px-4 py-2 sm:py-3 border-b ${stage.header} flex items-center justify-between`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={`h-2 w-2 rounded-full ${stage.dot} shrink-0`} />
          <span
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${stage.label_color} truncate`}
          >
            {stage.label}
          </span>
        </div>
        <span
          className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${stage.badge_bg} shrink-0`}
        >
          {stageOrders.length}
        </span>
      </div>

      {/* Cards — scroll within column */}
      <div className="flex-1 overflow-y-auto min-h-0 p-2 sm:p-3 space-y-2">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-24 sm:h-28 w-full rounded-xl" />
          ))
        ) : stageOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-16 sm:h-20 text-stone-300 gap-1">
            <div className={`${stage.label_color} opacity-20`}>
              {stage.icon}
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-stone-300">
              {t("empty")}
            </p>
          </div>
        ) : (
          stageOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white border border-stone-100 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 shadow-sm hover:shadow-md hover:border-stone-200 transition-all group cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-wide">
                    #{order.id}
                  </span>
                  <div className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                    ${order.total.toFixed(2)}
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[8px] sm:text-[10px] text-stone-400 bg-stone-50 border border-stone-100 px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-lg whitespace-nowrap shrink-0">
                  <Clock className="h-2 sm:h-2.5 w-2 sm:w-2.5" />
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: false,
                    locale: dateLocale,
                  })}
                </span>
              </div>

              {/* Items */}
              <div className="border-l-2 border-orange-200 pl-2 sm:pl-2.5 mb-2 sm:mb-3 space-y-0.5">
                {order.items.slice(0, 2).map((item, i) => (
                  <p
                    key={i}
                    className="text-[10px] sm:text-[11px] text-stone-600 leading-snug"
                  >
                    <span className="font-bold text-stone-800">
                      {item.quantity}×
                    </span>{" "}
                    {item.productName}
                  </p>
                ))}
                {order.items.length > 2 && (
                  <p className="text-[9px] sm:text-[10px] text-stone-400">
                    +{order.items.length - 2} {t("more")}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 sm:pt-2.5 border-t border-stone-50">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                    <User className="h-2 sm:h-2.5 w-2 sm:w-2.5 text-stone-500" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-stone-500 truncate max-w-[80px] sm:max-w-[60px]">
                    {order.customerName}
                  </span>
                </div>

                {/* Action button */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus.mutate({
                        id: order.id,
                        data: { status: "cancelled" },
                      });
                    }}
                    className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    {t("actionCancel")}
                  </button>
                  {stage.action && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus.mutate({
                          id: order.id,
                          data: { status: stage.action!.next as any },
                        });
                      }}
                      className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-all whitespace-nowrap ${
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
            </div>
          ))
        )}
      </div>

      <OrderDetailsModal
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        order={selectedOrder}
        stages={allStages}
      />
    </div>
  );
}

export default OrderStage;
