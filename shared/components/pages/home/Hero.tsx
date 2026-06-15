"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../../ui/badge";
import { Flame, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useGetTrendingProducts } from "@/apis/products";

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { data: trendingProducts } = useGetTrendingProducts();
  const t = useTranslations("HomePage");
  const HERO_TAGS = [
    t("heroTags.burgers"),
    t("heroTags.pizza"),
    t("heroTags.sushi"),
    t("heroTags.healthy"),
    t("heroTags.coffee"),
  ];
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/meals?query=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/meals");
    }
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-background to-amber-50 dark:from-orange-950/20 dark:via-background dark:to-amber-950/10">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="container mx-auto px-4 py-14 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1 text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary"
            >
              <Flame className="h-3.5 w-3.5" /> {t("hero.badge")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]"
          >
            {t("hero.titlePart1")}
            <span className="text-primary relative inline-block">
              {t("hero.titlePart2")}
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q50 0 100 5 Q150 10 200 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* search bar */}
          <div className="max-w-xl mx-auto relative z-20">
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative flex items-center shadow-lg shadow-primary/10 rounded-full ring-1 ring-border bg-background">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  className="pl-12 pr-32 h-14 text-base rounded-full border-0 shadow-none focus-visible:ring-0 bg-transparent"
                  placeholder={t("hero.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                <Button
                  type="submit"
                  className="absolute right-2 rounded-full px-6 h-10 font-semibold"
                >
                  {t("hero.searchButton")}
                </Button>
              </div>
            </motion.form>

            {isFocused &&
              !searchQuery &&
              trendingProducts &&
              trendingProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-background rounded-2xl shadow-xl border overflow-hidden text-left"
                >
                  <div className="p-3 bg-muted/50 border-b flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-muted-foreground">
                      Trending Products
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {trendingProducts.slice(0, 5).map((product) => (
                      <button
                        key={product.id}
                        className="w-full text-left px-4 py-3 hover:bg-muted flex items-center gap-3 transition-colors border-b last:border-0 cursor-pointer"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          router.push(`/product/${product.id}`);
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.merchantName}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
          </div>

          {/* quick-filter tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {HERO_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag === activeTag ? null : tag);
                  router.push("/discover");
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary/50 hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
