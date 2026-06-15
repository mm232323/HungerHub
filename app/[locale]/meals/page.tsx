import type { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import { getCategories, getProducts } from "@/lib/server-api";
import MealsClient from "./MealsClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const mealsPage = (t as any).MealsPage;

  return {
    title: mealsPage?.title || "Meals - HungerHub",
    description: mealsPage?.description || "Browse and discover our wide selection of meals.",
  };
}

export default async function MealsPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
      <MealsClient initialProducts={products} categories={categories} />
    </div>
  );
}
