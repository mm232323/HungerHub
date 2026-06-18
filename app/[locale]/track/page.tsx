import type { Metadata } from "next";
import { getOrders } from "@/lib/server-api";
import { OrdersView } from "@/shared/components/pages/track/orders-view";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Orders - HungerHub",
  description: "Track all your active and past orders in one place.",
};

export const dynamic = 'force-dynamic';

export default async function TrackOrdersPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  const orders = await getOrders();

  return <OrdersView orders={orders} />;
}
