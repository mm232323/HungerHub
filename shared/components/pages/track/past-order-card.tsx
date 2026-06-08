"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Order } from "@/types";

interface PastOrderCardProps {
  order: Order;
}

export function PastOrderCard({ order }: PastOrderCardProps) {
  const isDelivered = order.status === "delivered";

  return (
    <Link href={`/track/${order.id}`}>
      <div className="bg-background rounded-2xl p-4 shadow-sm border hover:shadow-md transition-shadow flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-4">
          <div className={`h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xl ${isDelivered ? 'bg-red-600' : 'bg-orange-500'}`}>
            {order.merchantName?.charAt(0) || "M"}
          </div>
          <div>
            <h3 className="font-bold">{order.merchantName}</h3>
            <p className="text-sm text-muted-foreground">Order ID: #{order.id}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-right">
          <div>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md capitalize ${isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {order.status}
            </span>
            <p className="text-[10px] text-muted-foreground mt-1">
              {isDelivered ? "Delivered on" : "Cancelled on"}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}
