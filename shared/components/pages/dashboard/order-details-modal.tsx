"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/alerts/dialog";
import { Order } from "@/types";
import { useTranslations, useLocale } from "next-intl";
import { formatDistanceToNow } from "date-fns";
import { Clock, User, MapPin, CreditCard, Receipt, Tag } from "lucide-react";
import { ar, enUS } from "date-fns/locale";
import { stageType } from "./data";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useUpdateOrderStatus } from "@/apis/orders";
import { useQueryClient } from "@tanstack/react-query";

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stages: stageType[];
}

export function OrderDetailsModal({ order, open, onOpenChange, stages }: OrderDetailsModalProps) {
  const t = useTranslations("Dashboard.Orders");
  const locale = useLocale();
  const dateLocale = locale === "ar" ? ar : enUS;
  const queryClient = useQueryClient();
  const updateStatus = useUpdateOrderStatus({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/dashboard/orders"] });
        onOpenChange(false);
      },
    },
  });

  if (!order) return null;

  const currentStage = stages.find((s) => s.id === order.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mt-2">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-stone-900">
              <Receipt className="w-6 h-6 text-orange-500" />
              {t("orderId", { id: order.id })}
            </DialogTitle>
            {currentStage && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${currentStage.badge_bg} ${currentStage.label_color}`}>
                {currentStage.label}
              </span>
            )}
          </div>
          <DialogDescription className="flex items-center gap-1.5 mt-1 text-stone-500">
            <Clock className="w-4 h-4" />
            {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: dateLocale })}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Customer & Delivery Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t("customerInfo")}
              </h4>
              <p className="font-semibold text-stone-900 text-sm">{order.customerName}</p>
              {order.customerPhone && (
                <p className="text-sm text-stone-600 mt-1">{order.customerPhone}</p>
              )}
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t("deliveryAddress")}
              </h4>
              <p className="text-sm text-stone-800 leading-relaxed">
                {order.address}
              </p>
            </div>
          </div>

          {/* Items List */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-3">{t("orderItems")}</h4>
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              <div className="divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between hover:bg-stone-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-orange-100 text-orange-700 font-bold text-xs rounded-md">
                        {item.quantity}x
                      </span>
                      <div>
                        <p className="font-medium text-sm text-stone-800">{item.productName}</p>
                        <p className="text-xs text-stone-500">${item.price.toFixed(2)} {t("each")}</p>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="bg-stone-50 p-4 border-t border-stone-200 space-y-2">
                <div className="flex justify-between text-sm text-stone-600">
                  <span>{t("subtotal")}</span>
                  <span>${(order.subtotal ?? 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600">
                  <span>{t("deliveryFee")}</span>
                  <span>${(order.deliveryFee ?? 0).toFixed(2)}</span>
                </div>
                {order.discount && order.discount > 0 ? (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {t("discount")}</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                ) : null}
                <div className="pt-2 border-t border-stone-200 flex justify-between items-center mt-2">
                  <span className="font-bold text-stone-900">{t("total")}</span>
                  <span className="text-lg font-black text-stone-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {t("paymentInfo")}
              </h4>
              <Badge variant="outline" className="text-stone-700 bg-white border-stone-200">
                {t(`payment.${order.paymentMethod}`, { defaultValue: order.paymentMethod })}
              </Badge>
            </div>
            
            {order.notes && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  {t("notes")}
                </h4>
                <p className="text-sm text-stone-700 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
                  "{order.notes}"
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Actions Footer */}
        <DialogFooter className="mt-6">
          <Button 
            variant="destructive"
            onClick={() => updateStatus.mutate({ id: order.id, data: { status: "cancelled" } })}
            disabled={updateStatus.isPending}
            className="w-full sm:w-auto"
          >
            {t("actionCancel")}
          </Button>
          
          {currentStage?.action && (
            <Button
              onClick={() => updateStatus.mutate({ id: order.id, data: { status: currentStage.action!.next as any } })}
              disabled={updateStatus.isPending}
              variant={currentStage.action.variant === "outline" ? "outline" : "default"}
              className={`w-full sm:w-auto ${currentStage.action.variant !== "outline" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
            >
              {currentStage.action.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
