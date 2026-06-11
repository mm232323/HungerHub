import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import { useTranslations } from "next-intl";

export function StepFour({ form, set }: { form: FormData, set: any }) {
  const t = useTranslations("MerchantSetup.Steps.step4");

  return (
    <>
      <div className="p-4 bg-stone-100 rounded-2xl text-center mb-2">
        <p className="text-sm text-stone-500">
          {t("skip")}
        </p>
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          {t("profileLabel")}
        </Label>
        <Input
          value={form.profileImage}
          onChange={(e) => set("profileImage", e.target.value)}
          placeholder={t("profilePlaceholder")}
          className="h-12 text-[15px] rounded-xl border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
        />
        {form.profileImage && (
          <div className="mt-2 flex items-center gap-3">
            <img
              src={form.profileImage}
              alt="Profile preview"
              className="h-12 w-12 rounded-full object-cover border-2 border-orange-200"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display =
                  "none";
              }}
            />
            <p className="text-xs text-stone-400">
              {t("previewMode")}
            </p>
          </div>
        )}
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          {t("coverLabel")}
        </Label>
        <Input
          value={form.coverImage}
          onChange={(e) => set("coverImage", e.target.value)}
          placeholder={t("coverPlaceholder")}
          className="h-12 text-[15px] rounded-xl border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
        />
        {form.coverImage && (
          <div className="mt-2">
            <img
              src={form.coverImage}
              alt="Cover preview"
              className="w-full h-24 rounded-xl object-cover border border-stone-200"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display =
                  "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-orange-700 font-bold text-sm">
          <Sparkles className="h-4 w-4" />
          {t("summaryTitle")}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
          <div>
            <span className="font-semibold block text-stone-900">
              {form.name || "—"}
            </span>
            {t("summaryName")}
          </div>
          <div>
            <span className="font-semibold block text-stone-900">
              {form.cuisineType || "—"}
            </span>
            {t("summaryCuisine")}
          </div>
          <div>
            <span className="font-semibold block text-stone-900">
              {form.deliveryTime}
            </span>
            {t("summaryTime")}
          </div>
          <div>
            <span className="font-semibold block text-stone-900">
              ${Number(form.deliveryFee || 0).toFixed(2)}
            </span>
            {t("summaryFee")}
          </div>
        </div>
      </div>
    </>
  );
}
