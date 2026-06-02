import { Merchant } from "@/types";
import { ChevronRight, Clock, Star, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function TrendingMerchants({
  trendingMerchants,
}: {
  trendingMerchants: Merchant[];
}) {
  const t = useTranslations("HomePage");

  return (
    <section className="py-8 px-4 container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">{t("trendingMerchants.title")}</h2>
        </div>
        <Link
          href="/discover"
          className="text-primary font-medium flex items-center text-sm hover:underline"
        >
          {t("trendingMerchants.seeAll")}{" "}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingMerchants.slice(0, 4).map((merchant) => (
          <Link
            key={merchant.id}
            href={`/merchant/${merchant.id}`}
            className="group block"
          >
            <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="relative h-36">
                <img
                  src={
                    merchant.coverImage ||
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"
                  }
                  alt={merchant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {merchant.rating?.toFixed(1) ?? t("trendingMerchants.new")}
                </div>
              </div>
              <div className="p-3 relative">
                <div className="absolute -top-6 left-3 border-2 border-background rounded-full overflow-hidden w-10 h-10 bg-muted shadow-sm">
                  <img
                    src={
                      merchant.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(merchant.name)}&background=random`
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-sm leading-tight line-clamp-1">
                    {merchant.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {merchant.cuisineType}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {merchant.deliveryTime}
                    </span>
                    <span>·</span>
                    <span>
                      ${merchant.deliveryFee}{" "}
                      {t("trendingMerchants.deliveryAbbr")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TrendingMerchants;
