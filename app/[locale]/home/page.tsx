import type { Metadata } from "next";
import {
  getCategories,
  getTrendingMerchants,
  getTrendingProducts,
} from "@/lib/server-api";

import { getMessages } from "next-intl/server";
import Hero from "@/shared/components/pages/home/Hero";
import StatsBar from "@/shared/components/pages/home/StatsBar";
import Categories from "@/shared/components/pages/home/Categories";
import TrendingMerchants from "@/shared/components/pages/home/TrendingMerchants";
import TrendingProducts from "@/shared/components/pages/home/TrendingProducts";
import HowItWork from "@/shared/components/pages/home/HowItWork";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const homePage = (t as any).HomePage;

  return {
    title: homePage?.title || "HungerHub",
    description:
      homePage?.description ||
      "Discover local gems, order in minutes, and track your delivery live.",
  };
}

export default async function HomePage() {
  const [categories, trendingMerchants, trendingProducts] = await Promise.all([
    getCategories(),
    getTrendingMerchants(),
    getTrendingProducts(),
  ]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Hero />
      <StatsBar />
      <Categories categories={categories} />
      <TrendingMerchants trendingMerchants={trendingMerchants} />
      <TrendingProducts trendingProducts={trendingProducts} />
      <HowItWork />
    </div>
  );
}
