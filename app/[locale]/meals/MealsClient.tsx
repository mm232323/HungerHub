"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import HeroSearchBanner from "@/shared/components/pages/meals/HeroSearchBanner";
import CategoriesRow from "@/shared/components/pages/meals/CategoriesRow";
import ResultsArea from "@/shared/components/pages/meals/ResultsArea";
import { PRICE_RANGES } from "@/shared/components/pages/meals/data";
import { Category, Product } from "@/types";
import { useGeolocation } from "@/hooks/useGeolocation";

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

  const { location, error } = useGeolocation();
  const [nearbyMerchantIds, setNearbyMerchantIds] = useState<number[]>([]);

  useEffect(() => {
    if (location && !error) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8080"}/merchants/trending?lat=${location.lat}&lng=${location.lng}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setNearbyMerchantIds(data.map(m => m.id));
          }
        })
        .catch(console.error);
    }
  }, [location, error]);

  let products = [...initialProducts];

  // If nearby merchants are loaded, prioritize their products first
  if (nearbyMerchantIds.length > 0) {
    products.sort((a, b) => {
      const idxA = nearbyMerchantIds.indexOf(a.merchantId);
      const idxB = nearbyMerchantIds.indexOf(b.merchantId);
      const rankA = idxA === -1 ? 9999 : idxA;
      const rankB = idxB === -1 ? 9999 : idxB;
      return rankA - rankB;
    });
  }

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
