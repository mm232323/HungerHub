import { Tag } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import { FieldError } from "./FieldError";
import { CUISINE_TYPES } from "./constants";

export function StepTwo({ form, set, errors, toggleTag }: { form: FormData, set: any, errors: any, toggleTag: any }) {
  return (
    <>
      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-3 block">
          Cuisine Type <span className="text-red-400">*</span>
        </Label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {CUISINE_TYPES.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => set("cuisineType", c.label)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all text-sm font-semibold ${
                form.cuisineType === c.label
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-stone-200 text-stone-600 hover:border-orange-200 hover:bg-orange-50"
              }`}
            >
              <span className="text-xl">{c.icon}</span>
              <span className="text-[11px] leading-none">
                {c.label}
              </span>
            </button>
          ))}
        </div>
        <FieldError message={errors.cuisineType} />
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-2 block">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags{" "}
            <span className="text-stone-400 font-normal">
              (up to 5)
            </span>
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
              {tag}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
