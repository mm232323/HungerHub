import type { Metadata } from "next";
import MerchantProfileClient from "./client";

export const metadata: Metadata = {
  title: "Merchant Store Profile - HungerHub",
  description: "Explore merchant details, delicious menus, ratings and review history.",
};

export default function MerchantPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams?.id || "1";
  return <MerchantProfileClient id={id} />;
}