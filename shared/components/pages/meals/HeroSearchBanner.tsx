"use client";

import { Flame, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "../../ui/input";

import { useGetTrendingProducts } from "@/apis/products";

export default function HeroSearchBanner({
  productsLength,
  query,
}: {
  productsLength: number;
  query: string;
}) {
  const t = useTranslations("MealsPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [localQuery, setLocalQuery] = useState(query);
  const [isFocused, setIsFocused] = useState(false);
  const { data: trendingProducts } = useGetTrendingProducts();

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (localQuery) {
      params.set("query", localQuery);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearSearch = () => {
    setLocalQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="bg-stone-950 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(249,115,22,0.12) 0%, transparent 50%),
                            radial-gradient(circle at 80% 30%, rgba(249,115,22,0.07) 0%, transparent 50%)`,
        }}
      />
      <div className="container mx-auto px-4 py-10 md:py-14 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-4">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">
              {productsLength > 0
                ? t("hero.dishesAvailable", { count: productsLength })
                : t("hero.dishesAvailableFallback")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            {t("hero.titlePart1")}{" "}
            <span className="text-orange-500">{t("hero.titlePart2")}</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto relative">
          <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden ring-1 ring-white/10">
            <Search className="absolute left-4 h-5 w-5 text-stone-400 pointer-events-none" />
            <Input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={t("hero.searchPlaceholder")}
              className="pl-12 pr-12 h-14 text-[15px] border-0 shadow-none focus-visible:ring-0 bg-transparent text-stone-900 placeholder:text-stone-400"
            />
            {localQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 p-1 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
          
          {isFocused && !localQuery && trendingProducts && trendingProducts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden text-left z-50">
              <div className="p-3 bg-stone-50 border-b border-stone-100 flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-stone-700">Trending Products</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {trendingProducts.slice(0, 5).map(product => (
                  <button 
                    key={product.id}
                    className="w-full text-left px-4 py-3 hover:bg-stone-50 flex items-center gap-3 transition-colors border-b border-stone-50 last:border-0"
                    onClick={() => router.push(`/meals?query=${encodeURIComponent(product.name)}`)}
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-stone-900">{product.name}</p>
                      <p className="text-xs text-stone-500">{product.merchantName}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
