"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/alerts/progress";
import {
  ChevronLeft,
  MapPin,
  Phone,
  ChefHat,
  Bike,
  PackageCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Order } from "@/types";

export type TrackOrderViewProps = {
  orderId: number;
  order: Order | null;
};

export function TrackOrderView({ orderId, order }: TrackOrderViewProps) {
  const [progress, setProgress] = useState(10);

  const formatTime = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const orderData: Order =
    order ??
    ({
      id: orderId,
      merchantId: 0,
      merchantName: "Burger Joint",
      items: [],
      total: 0,
      status: "preparing",
      address: "123 Main St, Apt 4B",
      paymentMethod: "card",
      createdAt: new Date().toISOString(),
      estimatedDelivery: "25-35 min",
      driverName: "Alex D.",
      driverPhone: "+1 (555) 123-4567",
    } as Order);

  useEffect(() => {
    let targetProgress = 10;
    switch (orderData.status) {
      case "pending":
        targetProgress = 10;
        break;
      case "confirmed":
        targetProgress = 25;
        break;
      case "preparing":
        targetProgress = 50;
        break;
      case "ready":
        targetProgress = 70;
        break;
      case "delivering":
        targetProgress = 90;
        break;
      case "delivered":
        targetProgress = 100;
        break;
      default:
        targetProgress = 10;
    }

    const timer = setTimeout(() => setProgress(targetProgress), 500);
    return () => clearTimeout(timer);
  }, [orderData.status]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          title: "Order Placed",
          icon: Clock,
          desc: "Waiting for confirmation",
        };
      case "confirmed":
        return {
          title: "Order Confirmed",
          icon: CheckCircle2,
          desc: "Restaurant accepted your order",
        };
      case "preparing":
        return {
          title: "Preparing Your Food",
          icon: ChefHat,
          desc: "Cooking up something delicious",
        };
      case "ready":
        return {
          title: "Ready for Pickup",
          icon: PackageCheck,
          desc: "Waiting for driver",
        };
      case "delivering":
        return {
          title: "On The Way",
          icon: Bike,
          desc: "Driver is heading to you",
        };
      case "delivered":
        return {
          title: "Delivered",
          icon: MapPin,
          desc: "Enjoy your meal!",
        };
      default:
        return { title: "Processing", icon: Clock, desc: "..." };
    }
  };

  const currentStatus = getStatusInfo(orderData.status);
  const StatusIcon = currentStatus.icon;

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <header className="bg-background border-b px-4 h-16 flex items-center justify-between sticky top-0 z-50">
        <Link href="/track">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold">Track Order #{orderData.id}</h1>
        <div className="w-10" />
      </header>

      <div className="h-[30vh] w-full bg-slate-200 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
          alt="Map"
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg shadow-primary/30">
            <Bike className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 -mt-10 relative z-10 space-y-6">
        <div className="bg-background rounded-3xl p-6 shadow-xl border">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Estimated Delivery
              </p>
              <h2 className="text-3xl font-bold">
                {formatTime(orderData.estimatedDelivery)}
              </h2>
            </div>
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <StatusIcon className="h-8 w-8" />
            </div>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-3 rounded-full" />

            <div className="flex items-center gap-4">
              <div className="bg-secondary p-2 rounded-full">
                <StatusIcon className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{currentStatus.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStatus.desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-3xl p-6 shadow-sm border space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{orderData.merchantName}</h3>
              <p className="text-sm text-muted-foreground">Preparing your order</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              View
            </Button>
          </div>

          <div className="h-px w-full bg-border" />

          {orderData.driverName && (
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-secondary rounded-full overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(orderData.driverName)}`}
                  alt={orderData.driverName}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{orderData.driverName}</h3>
                <p className="text-sm text-muted-foreground">Delivery Driver</p>
              </div>
              <Button size="icon" className="rounded-full h-10 w-10">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="h-px w-full bg-border" />

          <div className="flex items-start gap-4">
            <div className="mt-1">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Delivery Address
              </h3>
              <p className="font-medium mt-1">{orderData.address}</p>
            </div>
          </div>
        </div>
        <div className="bg-background rounded-3xl p-6 shadow-sm border space-y-4">
          <h3 className="font-bold text-lg mb-2">Order Summary</h3>
          <div className="space-y-3">
            {orderData.items && orderData.items.length > 0 ? (
              orderData.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="bg-muted px-2 py-0.5 rounded text-sm font-medium">{item.quantity}x</span>
                    <span className="font-medium text-sm">{item.productName}</span>
                  </div>
                  <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No items to display.</p>
            )}
          </div>
          
          <div className="h-px w-full bg-border my-2" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${(orderData.subtotal || orderData.total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">${(orderData.deliveryFee || 0).toFixed(2)}</span>
            </div>
            {!!(orderData as any).discount && (
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Discount {(orderData as any).promoCode ? `(${(orderData as any).promoCode})` : ''}</span>
                <span>-${((orderData as any).discount || 0).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span>${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
