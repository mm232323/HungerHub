import { motion } from 'framer-motion';
import { Clock, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react'

function ProductCard({ product, index }: { product: any; index: number }) {
  const t = useTranslations("MealsPage");
  const hasDiscount = !!product.discountPrice;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-stone-200 transition-all duration-300 cursor-pointer">
          {/* Image */}
          <div className="relative h-44 bg-stone-100 overflow-hidden">
            <img
              src={product.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {hasDiscount && (
                <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-full leading-none">
                  {t("badges.sale")}
                </span>
              )}
              {product.isVegetarian && (
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">
                  {t("badges.veggie")}
                </span>
              )}
            </div>

            {/* Quick add */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-orange-500 text-white p-2.5 rounded-full shadow-lg shadow-orange-500/30">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-1">
              <h3 className="font-bold text-stone-900 text-sm leading-tight line-clamp-1 group-hover:text-orange-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5 truncate">{product.merchantName}</p>
            </div>

            {product.description && (
              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-stone-50">
              <div>
                {hasDiscount ? (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-orange-600">
                      ${displayPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-stone-300 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-base font-black text-stone-900">
                    ${displayPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-stone-400">
                <Clock className="h-3 w-3" />
                <span>20 {t("badges.min")}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard