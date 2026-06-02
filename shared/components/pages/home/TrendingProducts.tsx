import { Product } from "@/types";
import { ChevronRight, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function TrendingProducts({
  trendingProducts,
}: {
  trendingProducts: Product[];
}) {
  const t = useTranslations("HomePage");
  return (
    <section className="py-8 px-4 container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">{t("trendingProducts.title")}</h2>
        </div>
        <Link
          href="/discover"
          className="text-primary font-medium flex items-center text-sm hover:underline"
        >
          {t("trendingProducts.viewAll")}{" "}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 hide-scrollbar snap-x">
        {trendingProducts.slice(0, 8).map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group shrink-0 snap-start w-44 block"
          >
            <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
              <div className="relative h-32 bg-muted">
                <img
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.discountPrice && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {t("trendingProducts.sale")}
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1">
                <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {product.merchantName}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    {product.discountPrice ? (
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-primary">
                          ${product.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sm">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
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

export default TrendingProducts;
