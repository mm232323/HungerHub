"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/alerts/progress";
import { ChevronRight, ChefHat, Bike, MapPin, CheckCircle2 } from "lucide-react";
import type { Order } from "@/types";
import { useTranslations } from "next-intl";

interface ActiveOrderCardProps {
  order: Order;
}

export function ActiveOrderCard({ order }: ActiveOrderCardProps) {
  const t = useTranslations("Orders");
  const formatTime = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  let progress = 10;
  switch (order.status) {
    case "pending":
    case "confirmed":
      progress = 10;
      break;
    case "preparing":
      progress = 15;
      break;
    case "ready":
      progress = 30;
      break;
    case "delivering":
      progress = 50;
      break;
    case "delivered":
      progress = 100;
      break;
  }

  const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
  const images = order.items.map(item => item.productImage).filter(Boolean);

  return (
    <div className="bg-background rounded-3xl p-5 shadow-sm border space-y-5 relative">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
            <span className="font-bold text-primary text-xl">
              {order.merchantName?.charAt(0) || "M"}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{order.merchantName}</h3>
            <p className="text-sm text-muted-foreground">{t("orderId")}: #{order.id}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("today")}, {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
        </div>
        <div className="text-right pr-6 md:pr-8">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full capitalize">
            {t(`status.${order.status}` as any) || order.status}
          </span>
          <p className="text-[10px] text-muted-foreground uppercase mt-2">{t("estimatedDelivery")}</p>
          <p className="font-bold text-primary">{formatTime(order.estimatedDelivery)}</p>
        </div>
      </div>

      <div className="px-2">
        <div className="relative">
          <Progress value={progress} className="h-1 bg-muted" />
        </div>
        <div className="flex justify-between mt-3 text-xs font-medium text-muted-foreground">
          <div className={`flex flex-col items-center gap-1 ${progress >= 10 ? 'text-primary' : ''}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${progress >= 10 ? 'border-primary bg-primary/10' : 'border-muted bg-background'}`}>
              <ChefHat className="h-4 w-4" />
            </div>
            <span>{t("preparing")}</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${progress >= 50 ? 'text-primary' : ''}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${progress >= 50 ? 'border-primary bg-primary/10' : 'border-muted bg-background'}`}>
              <Bike className="h-4 w-4" />
            </div>
            <span>{t("onTheWay")}</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${progress >= 100 ? 'text-primary' : ''}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${progress >= 100 ? 'border-primary bg-primary/10' : 'border-muted bg-background'}`}>
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span>{t("delivered")}</span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-border" />

      <div className="flex items-center justify-between pt-1">
        <div className="flex gap-2">
          {images.slice(0, 3).map((img, i) => (
            <img key={i} src={img || ""} alt="item" className="h-10 w-10 rounded-lg object-cover" />
          ))}
          {images.length > 3 && (
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
              +{images.length - 3}
            </div>
          )}
          <div className="ml-2 flex flex-col justify-center">
            <span className="text-sm font-semibold">{itemsCount} {t("items")}</span>
            <span className="text-xs text-primary font-medium">{t("viewItems")}</span>
          </div>
        </div>
        <Link href={`/track/${order.id}`}>
          <Button variant="outline" className="rounded-full font-semibold border-primary/20 text-primary hover:bg-primary/5">
            {t("orderDetails")}
          </Button>
        </Link>
      </div>

      <Link href={`/track/${order.id}`} className="absolute top-5 right-2 mt-1 mr-2 opacity-0 h-0 w-0 md:opacity-100 md:h-auto md:w-auto text-muted-foreground">
         <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
