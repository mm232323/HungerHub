import type { Metadata } from "next";
import CartClient from "./client";

export const metadata: Metadata = {
  title: "Checkout Cart - HungerHub",
  description: "Review your selected items, add delivery information and pay securely.",
};

export default function CartPage() {
  return <CartClient />;
}