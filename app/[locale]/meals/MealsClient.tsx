"use client";

import { useSearchParams } from "next/navigation";
import HeroSearchBanner from "@/shared/components/pages/meals/HeroSearchBanner";
import CategoriesRow from "@/shared/components/pages/meals/CategoriesRow";
import ResultsArea from "@/shared/components/pages/meals/ResultsArea";
import { PRICE_RANGES } from "@/shared/components/pages/meals/data";
import { Category, Product } from "@/types";

export default function MealsClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "default";
  const priceRange = searchParams.get("priceRange") || "all";

  let products = [...initialProducts];

  // Filter & Sort
  if (query) {
    products = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }
  if (category) {
    products = products.filter((p) => p.category === category);
  }
  
  const priceObj = PRICE_RANGES.find((r) => r.id === priceRange);
  if (priceObj && priceRange !== "all") {
    products = products.filter((p) => {
      const price = p.discountPrice ?? p.price;
      return price >= (priceObj.min ?? 0) && price <= (priceObj.max ?? 9999);
    });
  }

  if (sort === "price_asc") {
    products.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
  } else if (sort === "price_desc") {
    products.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
  } else if (sort === "name") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  const hasActiveFilters = !!category || sort !== "default" || priceRange !== "all" || !!query;

  return (
    <>
      <HeroSearchBanner productsLength={products.length} query={query} />
      <CategoriesRow activeCategory={category} categories={categories} />
      <ResultsArea
        sorted={products}
        activeCategory={category}
        query={query}
        hasActiveFilters={hasActiveFilters}
        categories={categories}
        sort={sort}
        priceRange={priceRange}
      />
    </>
  );
}
