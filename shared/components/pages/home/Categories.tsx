import { Category } from "@/types";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function Categories({ categories }: { categories: Category[] }) {
  const t = useTranslations("HomePage");

  return (
    <section className="py-12 px-4 container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t("categories.title")}</h2>
        <Link
          href="/discover"
          className="text-primary font-medium flex items-center text-sm hover:underline"
        >
          {t("categories.seeAll")} <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="flex w-full justify-between gap-3 overflow-x-auto pb-3 hide-scrollbar snap-x">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/discover?category=${cat.name}`}
            className="flex-1 shrink-0 min-w-[80px] snap-start group cursor-pointer"
          >
            <div className="w-full h-28 bg-secondary rounded-2xl flex flex-col items-center justify-center gap-2.5 border border-transparent group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-200">
              <span className="text-3xl">{cat.icon || "🍴"}</span>
              <span className="text-xs font-semibold text-center leading-tight px-1">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
