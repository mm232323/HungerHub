"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/react";
import { useRouter } from "next/navigation";
import { Utensils } from "lucide-react";
import { useTranslations } from "next-intl";
import { customFetch } from "@/utils/api";

export function MerchantSetupView() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const t = useTranslations("Auth.Setup");

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Set merchant role in unsafeMetadata, then initialize merchant, then redirect to dashboard
    user
      .update({ unsafeMetadata: { role: "merchant" } })
      .then(() => customFetch("/users/init", { method: "POST" }))
      .then(() => customFetch("/dashboard/init", { method: "POST" }))
      .then(() => {
        router.push("/dashboard");
      })
      .catch(() => {
        // Even if metadata fails, still redirect to dashboard
        router.push("/dashboard");
      });
  }, [isLoaded, user, router]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 bg-background auth-fade-in">
      <div className="bg-primary/10 p-4 rounded-2xl">
        <Utensils className="h-8 w-8 text-primary" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">{t("settingUp")}</h2>
        <p className="text-muted-foreground text-sm">{t("waitMsg")}</p>
      </div>
      <div className="flex gap-1.5">
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
      </div>
    </div>
  );
}
