import type { Metadata } from "next";
import { TrackOrderView } from "@/shared/components/pages/track/track-order-view";
import { getOrderById } from "@/lib/server-api";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Track Order Status - HungerHub",
  description:
    "Get real-time tracking updates, estimated arrival, map location and courier details.",
};

export default async function TrackPage({ params }: Props) {
  const { id } = await params;
  const orderId = parseInt(id, 10) || 0;
  const order = await getOrderById(orderId);

  return <TrackOrderView orderId={orderId} order={order} />;
}
