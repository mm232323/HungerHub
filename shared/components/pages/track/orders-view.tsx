"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";
import { ActiveOrderCard } from "./active-order-card";
import { PastOrderCard } from "./past-order-card";
import { useTranslations } from "next-intl";

interface OrdersViewProps {
  orders: Order[];
}

export function OrdersView({ orders }: OrdersViewProps) {
  const t = useTranslations("Orders");
  const [activeTab, setActiveTab] = useState("All Orders");
  const tabs = [
    { key: "All Orders", label: t("allOrders") },
    { key: "Preparing", label: t("preparing") },
    { key: "On the way", label: t("onTheWay") },
    { key: "Delivered", label: t("delivered") },
    { key: "Cancelled", label: t("cancelled") }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === "All Orders") return true;
    if (activeTab === "Preparing" && (order.status === "preparing" || order.status === "ready")) return true;
    if (activeTab === "On the way" && order.status === "delivering") return true;
    if (activeTab === "Delivered" && order.status === "delivered") return true;
    if (activeTab === "Cancelled" && order.status === "cancelled") return true;
    return false;
  });

  const activeOrders = filteredOrders.filter(o => o.status !== "delivered" && o.status !== "cancelled");
  const pastOrders = filteredOrders.filter(o => o.status === "delivered" || o.status === "cancelled");

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      <header className="bg-background pt-6 pb-4 px-4 sticky top-0 z-50 shadow-sm border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{t("myOrders")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("trackOrdersDesc")}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          <div className="flex gap-2 min-w-max border rounded-2xl p-1 bg-muted/30">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 pt-6 space-y-8 max-w-2xl mx-auto">
        {activeOrders.length > 0 && (
          <section>
            <h2 className="font-bold text-lg mb-4 text-foreground/90">{t("activeOrders")}</h2>
            <div className="space-y-4">
              {activeOrders.map(order => (
                <ActiveOrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}

        {pastOrders.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-foreground/90">{t("pastOrders")}</h2>
              <Button variant="link" className="text-primary font-semibold p-0 h-auto">{t("viewAll")}</Button>
            </div>
            <div className="space-y-3">
              {pastOrders.map(order => (
                <PastOrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}

        {filteredOrders.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>{t("noOrdersFound")}</p>
          </div>
        )}
      </main>
    </div>
  );
}
