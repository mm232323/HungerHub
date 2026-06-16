import { Tag } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import { FieldError } from "./FieldError";
import { useTranslations, useLocale } from "next-intl";

import { useListCategories } from "@/apis";

export function StepTwo({ form, set, errors, toggleTag }: { form: FormData, set: any, errors: any, toggleTag: any }) {
  const t = useTranslations("MerchantSetup.Steps.step2");
  const locale = useLocale();
  const { data: categories = [], isLoading } = useListCategories();
  
  return (
    <>
      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-3 block">
          {t("cuisineLabel")} <span className="text-red-400">*</span>
        </Label>
        {isLoading ? (
          <div className="flex items-center justify-center py-6 text-stone-400 text-sm">
            {t("loadingCategories")}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => set("cuisineType", c.name)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all text-sm font-semibold ${
                  form.cuisineType === c.name
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-stone-200 text-stone-600 hover:border-orange-200 hover:bg-orange-50"
                }`}
              >
                <span className="text-2xl leading-none" dangerouslySetInnerHTML={{ __html: c.icon }} />
                <span className="text-[11px] leading-none mt-1 text-center">
                  {locale === 'ar' ? (c.name_ar || c.name) : c.name}
                </span>
              </button>
            ))}
          </div>
        )}
        <FieldError message={errors.cuisineType} />
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-2 block">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            {t("tagsLabel")}
          </div>
        </Label>
        <div className="flex flex-wrap gap-2">
          {[
            "Spicy",
            "Vegan-friendly",
            "Gluten-free",
            "Family meals",
            "Late night",
            "Lunch specials",
            "Organic",
            "Street food",
            "Fine dining",
            "Quick bites",
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                form.tags.includes(tag)
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
              }`}
            >
              {t(`tags.${tag}`)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
