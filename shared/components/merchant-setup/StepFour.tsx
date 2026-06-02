import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";

export function StepFour({ form, set }: { form: FormData, set: any }) {
  return (
    <>
      <div className="p-4 bg-stone-100 rounded-2xl text-center mb-2">
        <p className="text-sm text-stone-500">
          You can skip this step and add photos later from your
          dashboard.
        </p>
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          Profile / Logo Image URL
        </Label>
        <Input
          value={form.profileImage}
          onChange={(e) => set("profileImage", e.target.value)}
          placeholder="https://your-image-url.com/logo.jpg"
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
              Profile preview
            </p>
          </div>
        )}
      </div>

      <div>
        <Label className="text-sm font-semibold text-stone-700 mb-1.5 block">
          Cover / Banner Image URL
        </Label>
        <Input
          value={form.coverImage}
          onChange={(e) => set("coverImage", e.target.value)}
          placeholder="https://your-image-url.com/banner.jpg"
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
          Almost there! Here's your store summary:
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
          <div>
            <span className="font-semibold block text-stone-900">
              {form.name || "—"}
            </span>
            Restaurant name
          </div>
          <div>
            <span className="font-semibold block text-stone-900">
              {form.cuisineType || "—"}
            </span>
            Cuisine type
          </div>
          <div>
            <span className="font-semibold block text-stone-900">
              {form.deliveryTime}
            </span>
            Delivery time
          </div>
          <div>
            <span className="font-semibold block text-stone-900">
              ${Number(form.deliveryFee || 0).toFixed(2)}
            </span>
            Delivery fee
          </div>
        </div>
      </div>
    </>
  );
}
