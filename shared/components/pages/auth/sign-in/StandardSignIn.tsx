import { Role } from "@/types";
import { SignIn } from "@clerk/react";
import { LayoutDashboard, ShoppingBag, Utensils } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { clerkAppearance } from "./data";

function StandardSignIn({
  role,
  handleRoleChange,
}: {
  role: Role;
  handleRoleChange: (role: Role) => void;
}) {
  const t = useTranslations("Auth.SignIn");
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
      </div>
    </div>
  );
}

export default StandardSignIn;
