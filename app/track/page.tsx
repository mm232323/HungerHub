import type { Metadata } from "next";
import TrackOrderClient from "./client";

export const metadata: Metadata = {
  title: "Track Order Status - HungerHub",
  description: "Get real-time tracking updates, estimated arrival, map location and courier details.",
};

export default function TrackPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams?.id || "123";
  return <TrackOrderClient id={id} />;
}