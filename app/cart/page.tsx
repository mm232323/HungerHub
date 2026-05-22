import type { Metadata } from "next";
import { CartPageView } from "@/shared/components/pages/cart/cart-page-view";

export const metadata: Metadata = {
  title: "Checkout Cart - HungerHub",
  description:
    "Review your selected items, add delivery information and pay securely.",
};

export default function CartPage() {
  return <CartPageView />;
}
