"use client";

import { Sparkles } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CategoriesRow({
  activeCategory,
  categories,
}: {
  activeCategory: string | null;
  categories: any[];
}) {
  const t = useTranslations("MealsPage");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggleCategory = (catName: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (catName) {
      params.set("category", catName);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white border-b border-stone-100 sticky top-16 z-30 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 py-3 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => handleToggleCategory(null)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
              !activeCategory
                ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("filters.allMeals")}
          </button>

          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleToggleCategory(activeCategory === cat.name ? null : cat.name)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                activeCategory === cat.name
                  ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                  : "bg-stone-50 text-stone-600 border-stone-200 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {cat.icon ? <span dangerouslySetInnerHTML={{ __html: cat.icon }} /> : <span>🍴</span>}
              {locale === 'ar' ? (cat.name_ar || cat.name) : cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
