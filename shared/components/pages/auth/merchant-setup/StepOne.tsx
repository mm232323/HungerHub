import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import { FieldError } from "./FieldError";
import { useTranslations } from "next-intl";

export function StepOne({ form, set, errors }: { form: FormData, set: any, errors: any }) {
  const t = useTranslations("MerchantSetup.Steps.step1");

  return (
    <>
      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          {t("nameLabel")} <span className="text-red-400">*</span>
        </Label>
        <Input
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder={t("namePlaceholder")}
          className="h-12 text-[15px] rounded-xl border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
        />
        <FieldError message={errors.name} />
      </div>
      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          {t("bioLabel")} <span className="text-red-400">*</span>
        </Label>
        <Textarea
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          placeholder={t("bioPlaceholder")}
          rows={4}
          className="text-[15px] rounded-xl border-stone-200 focus:border-orange-400 focus:ring-orange-400/20 resize-none"
        />
        <div className="flex justify-between items-center mt-1">
          <FieldError message={errors.bio} />
          <span className="text-xs text-stone-300 ml-auto rtl:mr-auto rtl:ml-0">
            {form.bio.length}/300
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
        <div className="p-2 bg-orange-100 rounded-lg shrink-0">
          <Sparkles className="h-4 w-4 text-orange-600" />
        </div>
        <p className="text-sm text-orange-700">
          {t("tip")}
        </p>
      </div>
    </>
  );
}
