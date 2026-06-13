"use client";

import React from "react";
import {
  clerkAppearance,
} from "./data";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SignUp } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

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
  
  return (
    <>
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
          <div className="w-full max-w-[550px]">
            <div className="flex relative p-1 bg-stone-100 rounded-xl w-fit">
              {(["customer", "merchant"] as Role[]).map((r) => {
                const isActive = role === r;
                return (
                <button
                  key={r}
                  onClick={() => handleChangeRole(r)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
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
              )})}
            </div>
          </div>

          <div className="w-full max-w-[550px]">
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
              appearance={clerkAppearance}
            />
          </div>
          
          {/* Trust Badges */}
          <div className="w-full max-w-[550px] flex justify-between items-center mt-6 border-t border-stone-100 pt-6">
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
    
      {/* Right panel image */}
      <div className="hidden lg:flex relative rounded-[25px] flex-1 overflow-hidden m-[20px] items-center justify-center bg-stone-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={role || "empty"}
            initial={{ opacity: 0, scale: 0.95, rotate: -2, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, rotate: 2, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Image
              src={role === "merchant" ? "/images/auth/merchant_bg.jpg" : "/images/auth/customer_bg.jpg"}
              alt={role === "merchant" ? "Grow your food empire today" : "Flavors you'll absolutely crave"}
              className="w-full h-auto object-cover rounded-[25px]"
              priority
              height={2200}
              width={1700}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default StandardSignUp;
