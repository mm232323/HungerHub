import React from "react";
import { useTranslations } from "next-intl";

function OrderSummary({
  subtotal,
  deliveryFee,
  total,
}: {
  subtotal: number;
  deliveryFee: number;
  total: number;
}) {
  const t = useTranslations("Cart");

  return (
    <section className="space-y-4 p-6 border rounded-2xl bg-muted/30">
      <h2 className="text-lg font-bold">{t("orderSummary") || "Order Summary"}</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("subtotal") || "Subtotal"}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("deliveryFee") || "Delivery Fee"}</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
          <span>{t("total") || "Total"}</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
