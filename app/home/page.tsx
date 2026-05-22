import type { Metadata } from "next";
import { HomePageView } from "@/shared/components/pages/home/home-page-view";
import {
  getCategories,
  getTrendingMerchants,
  getTrendingProducts,
} from "@/lib/server-api";

export const metadata: Metadata = {
  title: "HungerHub - Food You'll Actually Love",
  description:
    "Discover local gems, order in minutes, and track your delivery live.",
};

export default async function HomePage() {
  const [categories, trendingMerchants, trendingProducts] = await Promise.all([
    getCategories(),
    getTrendingMerchants(),
    getTrendingProducts(),
  ]);

  return (
    <HomePageView
      categories={categories}
      trendingMerchants={trendingMerchants}
      trendingProducts={trendingProducts}
    />
  );
}
