import { Role } from "@/types";
import { SignIn } from "@clerk/nextjs";
import { LayoutDashboard, ShoppingBag, Utensils } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { clerkAppearance } from "./data";

import { getClerkLocalization } from "../sign-up/data";

function StandardSignIn({
  role,
  handleRoleChange,
}: {
  role: Role;
  handleRoleChange: (role: Role) => void;
}) {
  const t = useTranslations("Auth.SignIn");
  const tShared = useTranslations("Auth.shared");
  const tGlobal = useTranslations("Global");
  const locale = useLocale();
  const basePath = `/${locale}`;
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white text-stone-900 transition-colors duration-300">
      {/* Mobile logo */}
      <div className="lg:hidden mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="bg-[#F97316] p-2 rounded-xl">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-stone-900">
            {tGlobal("brand")}
          </span>
        </Link>
      </div>

      <div className="w-full flex flex-col items-center gap-5 auth-slide-up">
        {/* Back to site link */}
        <div className="w-[440px] max-w-full flex justify-end">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
          >
            {t("backToHome")}
          </Link>
        </div>

        {/* Role switcher */}
        <div className="w-[440px] max-w-full">
          <div className="flex gap-1 p-1 bg-stone-100 rounded-xl w-fit">
            {(["customer", "merchant"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  role === r
                    ? "bg-[#F97316] text-white shadow"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                {r === "customer" ? (
                  <ShoppingBag className="h-3.5 w-3.5" />
                ) : (
                  <LayoutDashboard className="h-3.5 w-3.5" />
                )}
                {r === "customer" ? t("roleCustomer") : t("roleMerchant")}
              </button>
            ))}
          </div>
        </div>

        <SignIn
          key={`signin-${role}`}
          routing="path"
          path={`${basePath}/auth/sign-in`}
          signUpUrl={`${basePath}/auth/sign-up`}
          fallbackRedirectUrl={`${basePath}/`}
          appearance={clerkAppearance}
        />

        {role === "merchant" && (
          <p className="text-sm text-stone-400 text-center">
            {t("newRestaurant")}{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
            >
              {t("registerMerchant")}
            </Link>
          </p>
        )}

        {/* Trust Badges */}
        <div className="w-[440px] max-w-full flex justify-between items-center mt-6 border-t border-stone-100 pt-6">
          <div className="flex items-center gap-2">
            <div className="bg-orange-50 p-1.5 rounded-full text-[#F97316]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">{tShared("secureAndSafe") || "Secure & Safe"}</p>
              <p className="text-[10px] text-stone-500">{tShared("yourDataIsProtected") || "Your data is protected"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-50 p-1.5 rounded-full text-[#F97316]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">{tShared("fastDelivery") || "Fast Delivery"}</p>
              <p className="text-[10px] text-stone-500">{tShared("onTimeEveryTime") || "On-time, every time"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-50 p-1.5 rounded-full text-[#F97316]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">{tShared("bestQuality") || "Best Quality"}</p>
              <p className="text-[10px] text-stone-500">{tShared("topRestaurantsOnly") || "Top restaurants only"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StandardSignIn;
