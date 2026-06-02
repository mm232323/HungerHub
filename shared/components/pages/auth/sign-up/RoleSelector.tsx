"use client";

import { Utensils } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import RolesCards from "./RolesCards";

export function RoleSelector({
  onSelect,
}: {
  onSelect: (r: "customer" | "merchant") => void;
}) {
  const t = useTranslations("Auth.SignUp");
  const tGlobal = useTranslations("Global");

  return (
    <div className="relative z-10 w-full max-w-2xl auth-slide-up">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 p-3 rounded-2xl group-hover:bg-orange-500/30 transition-colors">
            <Utensils className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-3xl font-black text-white tracking-tight">
            {t("joinTitle").replace("HungerHub", "")} {tGlobal("brand")}
          </span>
        </Link>
      </div>

      {/* Headline */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-4xl font-black text-white">{t("joinTitle")}</h1>
        <p className="text-white/45 text-base">{t("howToStart")}</p>
      </div>
      <RolesCards onSelect={onSelect} />

      {/* Sign-in link */}
      <p className="text-center text-sm text-white/35 mt-8">
        {t("alreadyHaveAccount")}{" "}
        <Link
          href="/auth/sign-in"
          className="font-semibold text-orange-400 hover:text-orange-300 transition-colors"
        >
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
