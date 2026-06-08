"use client";

import React from "react";
import {
  BG_EMOJIS,
  clerkAppearance,
  getCustomerPerks,
  getMerchantPerks,
} from "./data";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  LayoutDashboard,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SignUp } from "@clerk/react";

import { Role } from "@/types";

function StandardSignUp({
  role,
  handleChangeRole,
}: {
  role: Role;
  handleChangeRole: (r: Role) => void;
}) {
  const t = useTranslations("Auth.SignUp");
  const tShared = useTranslations("Auth.shared");
  const tGlobal = useTranslations("Global");
  const locale = useLocale();
  const basePath = `/${locale}`;
  
  const customerPerks = getCustomerPerks();
  const merchantPerks = getMerchantPerks();

  return (
    <>
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
        style={{
          background:
            "linear-gradient(145deg,#160800 0%,#2a1000 40%,#1a0a02 70%,#0d0500 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[520px] h-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(249,115,22,0.30) 0%,transparent 65%)",
              bottom: "-60px",
              right: "-80px",
            }}
          />
        </div>
        {BG_EMOJIS.slice(0, 5).map((e, i) => (
          <span
            key={i}
            className={e.anim}
            style={{
              position: "absolute",
              top: e.top,
              left: e.left,
              fontSize: e.size,
              opacity: e.opacity + 0.4,
              animationDelay: e.delay,
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
              userSelect: "none",
            }}
          >
            {e.emoji}
          </span>
        ))}

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 p-2.5 rounded-2xl">
              <Utensils className="h-6 w-6 text-orange-400" />
            </div>
            <span className="text-2xl font-bold text-white">
              {tGlobal("brand")}
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-5">
          <h1 className="text-5xl font-black text-white leading-[1.1]">
            {role === "merchant" ? (
              <>
                {t("growYour")}
                <br />
                <span className="text-orange-400">{t("restaurant")}</span>
                <br />
                {t("today")}
              </>
            ) : (
              <>
                {t("foodYoull")}
                <br />
                <span className="text-orange-400">{t("actually")}</span>
                <br />
                {t("love")}
              </>
            )}
          </h1>
          <ul className="space-y-3">
            {(role === "merchant" ? merchantPerks : customerPerks).map(
              (p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="h-7 w-7 bg-white/8 border border-white/12 rounded-full flex items-center justify-center shrink-0">
                    {p.icon}
                  </span>
                  <span className="text-white/65 text-sm">{p.text}</span>
                </li>
              ),
            )}
          </ul>
          {/* Role badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 border ${
              role === "merchant"
                ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-300"
                : "bg-orange-500/10 border-orange-500/25 text-orange-300"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">
              {role === "merchant" ? t("merchantAcct") : t("customerAcct")}{" "}
              {t("selected")}
            </span>
          </div>
        </div>

        <p className="relative z-10 text-white/20 text-xs">
          {tShared("copyright")}
        </p>
      </div>

      {/* Right panel */}
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

        <div className="w-full flex flex-col items-center gap-4 auth-slide-up">
          {/* Role switcher */}
          <div className="w-[440px] max-w-full">
            <div className="flex gap-1 p-1 bg-stone-100 rounded-xl w-fit">
              {(["customer", "merchant"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleChangeRole(r)}
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

          <SignUp
            key={`signup-${role}`}
            routing="path"
            path={`${basePath}/auth/sign-up`}
            signInUrl={`${basePath}/auth/sign-in`}
            fallbackRedirectUrl={
              role === "merchant"
                ? `${basePath}/auth/merchant-setup`
                : `${basePath}/auth/customer-setup`
            }
            // afterSignUpUrl={
            //   role === "merchant"
            //     ? `${basePath}/auth/merchant-setup`
            //     : `${basePath}/auth/customer-setup`
            // }
            appearance={clerkAppearance}
          />
        </div>
      </div>
    </>
  );
}

export default StandardSignUp;
