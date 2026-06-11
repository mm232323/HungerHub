"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProductCard from "./ProductCard";
import { Category, Product } from "@/types";
import { PRICE_RANGES, SORT_OPTIONS } from "./data";

export default function ResultsArea({
  sorted,
  activeCategory,
  query,
  hasActiveFilters,
  categories,
  sort,
  priceRange,
}: {
  sorted: Product[];
  activeCategory: string | null;
  query: string;
  hasActiveFilters: boolean;
  categories: Category[];
  sort: string;
  priceRange: string;
}) {
  const t = useTranslations("MealsPage");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="container mx-auto px-4 pt-6">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-stone-900">
            {sorted.length === 1
              ? t("filters.mealsFound", { count: sorted.length })
              : t("filters.mealsFoundPlural", { count: sorted.length })}
          </span>

          {activeCategory && (
            <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">
              {(() => {
                const cat = categories?.find((c) => c.name === activeCategory);
                return (
                  <>
                    {cat?.icon ? <span dangerouslySetInnerHTML={{ __html: cat.icon }} /> : null}
                    {cat && locale === 'ar' ? (cat.name_ar || cat.name) : activeCategory}
                  </>
                );
              })()}
              <button
                onClick={() => updateParam("category", null)}
                className="hover:text-orange-900"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {query && (
            <span className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold px-3 py-1.5 rounded-full">
              <Search className="h-3 w-3" />"{query}"
              <button
                onClick={() => updateParam("query", null)}
                className="hover:text-stone-900"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-orange-600 font-semibold hover:underline"
            >
              {t("filters.clearAll")}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={priceRange}
            onChange={(e) => updateParam("priceRange", e.target.value)}
            className="text-sm bg-white border border-stone-200 rounded-xl px-3 py-2 font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
          >
            {PRICE_RANGES.map((r) => (
              <option key={r.id} value={r.id}>
                {t(r.label as any)}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="text-sm bg-white border border-stone-200 rounded-xl px-3 py-2 font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {t(s.label as any)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="bg-stone-100 rounded-full p-6">
            <Search className="h-10 w-10 text-stone-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">
              {t("emptyState.title")}
            </h3>
            <p className="text-stone-400 text-sm max-w-xs">
              {t("emptyState.description")}
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 underline"
          >
            {t("emptyState.clearFilters")}
          </button>
        </div>
      ) : (
        <motion.div
          key={`${activeCategory}-${query}-${sort}-${priceRange}`}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
