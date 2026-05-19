import type { Metadata } from "next";
import ProductDetailsClient from "./client";

export const metadata: Metadata = {
  title: "Product Details - HungerHub",
  description: "View ingredients, nutritional details, prices and add directly to your cart.",
};

export default function ProductPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams?.id || "1";
  return <ProductDetailsClient id={id} />;
}