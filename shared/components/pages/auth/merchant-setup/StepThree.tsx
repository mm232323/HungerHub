import { MapPin, Clock, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import { FieldError } from "./FieldError";
import { DELIVERY_TIMES } from "./constants";
import { useTranslations } from "next-intl";

export function StepThree({ form, set, errors }: { form: FormData, set: any, errors: any }) {
  const t = useTranslations("MerchantSetup.Steps.step3");

  return (
    <>
      <div className="mb-4">
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {t("countryLabel")}{" "}
            <span className="text-red-400">*</span>
          </div>
        </Label>
        <select
          value={form.country}
          onChange={(e) => set("country", e.target.value)}
          className="w-full h-12 px-3 text-[15px] rounded-xl border-stone-200 border bg-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
        >
          <option value="" disabled>{t("countryPlaceholder")}</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="Egypt">Egypt</option>
          <option value="Other">Other</option>
        </select>
        <FieldError message={errors.country} />
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {t("addressLabel")}{" "}
            <span className="text-red-400">*</span>
          </div>
        </Label>
        <Input
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder={t("addressPlaceholder")}
          className="h-12 text-[15px] rounded-xl border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
        />
        <FieldError message={errors.address} />
        
        <div className="mt-3 mb-2">
          <button
            type="button"
            onClick={() => {
              if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((pos) => {
                  set("latitude", pos.coords.latitude);
                  set("longitude", pos.coords.longitude);
                });
              } else {
                alert("Geolocation is not supported by your browser");
              }
            }}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
              form.latitude && form.longitude 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100"
            }`}
          >
            <MapPin className="h-4 w-4" />
            {form.latitude && form.longitude ? t("locationSaved") : t("useMyLocation")}
          </button>
          <p className="text-xs text-stone-500 mt-1.5">
            {t("locationHelpText")}
          </p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-3 block">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {t("timeLabel")}
          </div>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DELIVERY_TIMES.map((timeStr) => (
            <button
              key={timeStr}
              type="button"
              onClick={() => set("deliveryTime", timeStr)}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                form.deliveryTime === timeStr
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-stone-200 text-stone-600 hover:border-orange-200"
              }`}
            >
              {timeStr}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> {t("feeLabel")}{" "}
            <span className="text-red-400">*</span>
          </div>
        </Label>
        <div className="relative">
          <span className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-stone-400 font-bold">
            $
          </span>
          <Input
            value={form.deliveryFee}
            onChange={(e) => set("deliveryFee", e.target.value)}
            type="number"
            step="0.5"
            min="0"
            placeholder={t("feePlaceholder")}
            className="pl-8 rtl:pl-3 rtl:pr-8 h-12 text-[15px] rounded-xl border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
          />
        </div>
        <FieldError message={errors.deliveryFee} />
      </div>

      <div className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-xl mt-4">
        <div>
          <p className="text-sm font-semibold text-stone-900">
            {t("isOpen")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => set("isOpen", !form.isOpen)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            form.isOpen ? "bg-orange-500" : "bg-stone-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${form.isOpen ? "translate-x-6 rtl:-translate-x-6" : "translate-x-1 rtl:-translate-x-1"}`}
          />
        </button>
      </div>
    </>
  );
}
