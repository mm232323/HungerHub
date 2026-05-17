'use client'
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useGetTrendingProducts, useListCategories, useGetTrendingMerchants } from "@workspace/api-client-react";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
  Search, Star, Clock, ChevronRight, Store, ArrowRight,
  Flame, TrendingUp, ShoppingBag, Users, Zap
} from "lucide-react";
import { motion } from "framer-motion";

const HERO_TAGS = ["🍔 Burgers", "🍕 Pizza", "🍣 Sushi", "🥗 Healthy", "☕ Coffee"];

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { data: categories, isLoading: isLoadingCategories } = useListCategories({
    query: { queryKey: ["/api/categories"] }
  });

  const { data: trendingMerchants, isLoading: isLoadingMerchants } = useGetTrendingMerchants({
    query: { queryKey: ["/api/merchants/trending"] }
  });

  const { data: trendingProducts, isLoading: isLoadingProducts } = useGetTrendingProducts({
    query: { queryKey: ["/api/products/trending"] }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/discover?q=${encodeURIComponent(searchQuery)}`);
    } else {
      setLocation("/discover");
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">

      {/* ── Hero ── */}
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
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
                <Flame className="h-3.5 w-3.5" /> 8 local gems near you
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]"
            >
              Discover food you'll{" "}
              <span className="text-primary relative inline-block">
                actually love
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              The best local food gems, homemade meals, and passionate food startups — ordered in minutes, delivered to your door.
            </motion.p>

            {/* search bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="relative flex items-center shadow-lg shadow-primary/10 rounded-full ring-1 ring-border bg-background">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  className="pl-12 pr-32 h-14 text-base rounded-full border-0 shadow-none focus-visible:ring-0 bg-transparent"
                  placeholder="Burgers, sushi, homemade pasta…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-2 rounded-full px-6 h-10 font-semibold">
                  Search
                </Button>
              </div>
            </motion.form>

            {/* quick-filter tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {HERO_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTag(tag === activeTag ? null : tag);
                    setLocation("/discover");
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeTag === tag
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

      {/* ── Stats Bar ── */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-3 divide-x divide-border max-w-2xl mx-auto text-center">
            {[
              { icon: <Store className="h-4 w-4" />, value: "8+", label: "Local merchants" },
              { icon: <ShoppingBag className="h-4 w-4" />, value: "17+", label: "Fresh dishes" },
              { icon: <Zap className="h-4 w-4" />, value: "20 min", label: "Avg. delivery" },
            ].map(({ icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 px-4">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                  {icon}{value}
                </div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-12 px-4 container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">What are you feeling?</h2>
          <Link href="/discover" className="text-primary font-medium flex items-center text-sm hover:underline">
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar snap-x">
          {isLoadingCategories
            ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28 w-24 shrink-0 rounded-2xl" />)
            : categories?.map(cat => (
              <Link
                key={cat.id}
                href={`/discover?category=${cat.name}`}
                className="shrink-0 snap-start group cursor-pointer"
              >
                <div className="w-24 h-28 bg-secondary rounded-2xl flex flex-col items-center justify-center gap-2.5 border border-transparent group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-200">
                  <span className="text-3xl">{cat.icon || "🍴"}</span>
                  <span className="text-xs font-semibold text-center leading-tight px-1">{cat.name}</span>
                </div>
              </Link>
            ))
          }
        </div>
      </section>

      {/* ── Trending Merchants ── */}
      <section className="py-8 px-4 container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Trending Local Gems</h2>
          </div>
          <Link href="/discover" className="text-primary font-medium flex items-center text-sm hover:underline">
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoadingMerchants
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-60 rounded-2xl" />)
            : trendingMerchants?.slice(0, 4).map(merchant => (
              <Link key={merchant.id} href={`/merchant/${merchant.id}`} className="group block">
                <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <div className="relative h-36">
                    <img
                      src={merchant.coverImage || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"}
                      alt={merchant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {merchant.rating?.toFixed(1) ?? "New"}
                    </div>
                  </div>
                  <div className="p-3 relative">
                    <div className="absolute -top-6 left-3 border-2 border-background rounded-full overflow-hidden w-10 h-10 bg-muted shadow-sm">
                      <img
                        src={merchant.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(merchant.name)}&background=random`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-bold text-sm leading-tight line-clamp-1">{merchant.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{merchant.cuisineType}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {merchant.deliveryTime}
                        </span>
                        <span>·</span>
                        <span>${merchant.deliveryFee} del.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>

      {/* ── Trending Products ── */}
      <section className="py-8 px-4 container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Hot Right Now</h2>
          </div>
          <Link href="/discover" className="text-primary font-medium flex items-center text-sm hover:underline">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 hide-scrollbar snap-x">
          {isLoadingProducts
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-52 w-44 shrink-0 rounded-2xl" />)
            : trendingProducts?.slice(0, 8).map(product => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group shrink-0 snap-start w-44 block"
              >
                <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <div className="relative h-32 bg-muted">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discountPrice && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{product.merchantName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {product.discountPrice ? (
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-sm text-primary">${product.discountPrice.toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-4 bg-muted/40">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">How FoodHub works</h2>
            <p className="text-muted-foreground mt-2">From craving to doorstep in three easy steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                emoji: "🔍",
                title: "Discover",
                desc: "Browse the feed, explore categories, or search for exactly what you're craving right now.",
              },
              {
                step: "02",
                emoji: "🛒",
                title: "Order",
                desc: "Pick your dishes, add them to cart, and checkout in seconds — no account needed.",
              },
              {
                step: "03",
                emoji: "🚀",
                title: "Track & Enjoy",
                desc: "Watch your order live from kitchen to doorstep. Contactless delivery, always fresh.",
              },
            ].map(({ step, emoji, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border shadow-sm">
                <span className="text-4xl mb-4">{emoji}</span>
                <span className="text-xs font-bold text-primary/60 tracking-widest mb-1">STEP {step}</span>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Merchant CTA ── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-16 px-4">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-foreground/70" />
                <span className="text-sm font-medium text-primary-foreground/70">For food entrepreneurs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Run your food business like a pro
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Get orders, manage your kitchen pipeline, run promo campaigns, and grow your following — all from one tight dashboard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button size="lg" variant="secondary" className="rounded-full font-bold px-8 h-14 text-base shadow-lg gap-2" asChild>
                <Link href="/dashboard">
                  <Store className="h-5 w-5" /> Open Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-14 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2" asChild>
                <Link href="/discover">
                  Explore first <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
