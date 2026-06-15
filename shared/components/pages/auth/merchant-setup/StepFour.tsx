import { useState } from "react";
import { Sparkles, UploadCloud, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import { useTranslations } from "next-intl";
import { customFetch } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

export function StepFour({ form, set }: { form: FormData, set: any }) {
  const t = useTranslations("MerchantSetup.Steps.step4");
  const toastT = useTranslations("Toasts");
  const { toast } = useToast();
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profileImage" | "coverImage",
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // show preview
      const previewUrl = URL.createObjectURL(file);
      set(field, previewUrl);

      // upload
      const setUploading = field === "profileImage" ? setIsUploadingProfile : setIsUploadingCover;
      setUploading(true);
      
      try {
        const toBase64 = (blob: Blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        const dataUri = await toBase64(file);

        const json = await customFetch<{ url: string }>("/upload", {
          method: "POST",
          body: { dataUri, folder: "merchant" },
        });

        if (json && json.url) {
          set(field, json.url);
        } else {
          toast({ title: toastT("uploadFailed"), variant: "destructive" });
        }
      } catch (err) {
        console.error(err);
        toast({ title: toastT("uploadError"), variant: "destructive" });
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <>
      <div className="p-4 bg-stone-100 rounded-2xl text-center mb-2">
        <p className="text-sm text-stone-500">
          {t("skip")}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold text-stone-800">
            {t("profileLabel")}
          </h3>
        </div>

        <div className="border border-stone-200 rounded-xl p-4 flex items-center justify-center relative bg-white h-[120px] overflow-hidden">
          {form.profileImage ? (
            <img
              src={form.profileImage}
              alt="Logo"
              className="max-w-[100px] max-h-[100px] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-stone-400 opacity-50">
              <span className="text-xs font-medium">Default Logo</span>
            </div>
          )}
        </div>

        <label
          className={`w-full border border-stone-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-white h-10 gap-2 relative overflow-hidden flex items-center justify-center rounded-md font-medium text-sm cursor-pointer transition-colors ${isUploadingProfile ? "opacity-50 pointer-events-none" : ""}`}
        >
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "profileImage")}
            disabled={isUploadingProfile}
          />
          <UploadCloud className="h-4 w-4 mr-2" />{" "}
          {isUploadingProfile ? "Uploading..." : "Upload Logo"}
        </label>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div>
          <h3 className="text-sm font-semibold text-stone-800">
            {t("coverLabel")}
          </h3>
        </div>

        <div className="border border-stone-200 rounded-xl overflow-hidden relative bg-stone-100 h-[150px] w-full">
          {form.coverImage ? (
            <img
              src={form.coverImage}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400 text-xs">
              Banner Placeholder
            </div>
          )}
        </div>

        <label
          className={`w-full border border-stone-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-white h-10 gap-2 relative overflow-hidden flex items-center justify-center rounded-md font-medium text-sm cursor-pointer transition-colors ${isUploadingCover ? "opacity-50 pointer-events-none" : ""}`}
        >
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "coverImage")}
            disabled={isUploadingCover}
          />
          <UploadCloud className="h-4 w-4 mr-2" />{" "}
          {isUploadingCover ? "Uploading..." : "Upload Banner"}
        </label>
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
