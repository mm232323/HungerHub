"use client";

import {
  ArrowRight,
  BarChart3,
  Clock,
  Heart,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

function RolesCards({
  onSelect,
}: {
  onSelect: (r: "customer" | "merchant") => void;
}) {
  const t = useTranslations("Auth.SignUp");
  const customerPerks = [
    {
      icon: <Clock className="h-4 w-4 text-orange-500" />,
      text: t("perkDelivery"),
    },
    {
      icon: <MapPin className="h-4 w-4 text-orange-500" />,
      text: t("perkTracking"),
    },
    { icon: <Heart className="h-4 w-4 text-orange-500" />, text: t("perkFav") },
  ];

  const merchantPerks = [
    {
      icon: <TrendingUp className="h-4 w-4 text-indigo-400" />,
      text: t("perkAnalytics"),
    },
    {
      icon: <Users className="h-4 w-4 text-indigo-400" />,
      text: t("perkKanban"),
    },
    {
      icon: <BarChart3 className="h-4 w-4 text-indigo-400" />,
      text: t("perkAI"),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* ── Customer Card ── */}
      <button
        onClick={() => onSelect("customer")}
        className="group relative overflow-hidden rounded-3xl text-left transition-all duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
      >
        {/* Card glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "0 0 40px rgba(249,115,22,0.35)",
            border: "1px solid rgba(249,115,22,0.5)",
          }}
        />

        {/* Top gradient section */}
        <div
          className="relative overflow-hidden px-7 pt-7 pb-10"
          style={{
            background:
              "linear-gradient(135deg,#f97316 0%,#fb923c 40%,#fbbf24 100%)",
          }}
        >
          <div className="absolute -top-4 -right-4 text-7xl opacity-20 rotate-12 select-none">
            🍕
          </div>
          <div className="absolute bottom-2  right-14 text-4xl opacity-15 -rotate-6 select-none">
            🍔
          </div>
          <div className="absolute top-6 right-6 text-3xl opacity-20 rotate-6 select-none">
            🌮
          </div>
          <span className="inline-flex items-center gap-1.5 bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            {t("mostPopular")}
          </span>
          <div className="text-5xl mb-1 auth-float-alt">🛒</div>
        </div>

        {/* White body */}
        <div className="bg-white px-7 py-6 space-y-4">
          <div>
            <h3 className="text-xl font-black text-stone-900">
              {t("imCustomer")}
            </h3>
            <p className="text-stone-400 text-sm mt-1">{t("browseOrder")}</p>
          </div>
          <ul className="space-y-2">
            {customerPerks.map((p, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="shrink-0 h-5 w-5 bg-orange-50 rounded-full flex items-center justify-center">
                  {p.icon}
                </span>
                <span className="text-stone-500 text-sm">{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-orange-500 font-bold text-sm pt-1 group-hover:gap-3 transition-all duration-200">
            {t("getStarted")} <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </button>

      {/* ── Merchant Card ── */}
      <button
        onClick={() => onSelect("merchant")}
        className="group relative overflow-hidden rounded-3xl text-left transition-all duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
      >
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "0 0 40px rgba(99,102,241,0.30)",
            border: "1px solid rgba(99,102,241,0.45)",
          }}
        />

        {/* Top gradient section */}
        <div
          className="relative overflow-hidden px-7 pt-7 pb-10"
          style={{
            background:
              "linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4338ca 100%)",
          }}
        >
          <div className="absolute -top-4 -right-4 text-7xl opacity-10 rotate-12 select-none">
            📊
          </div>
          <div className="absolute bottom-2  right-14 text-4xl opacity-10 -rotate-6 select-none">
            💹
          </div>
          <div className="absolute top-6 right-6 text-3xl opacity-15 rotate-6 select-none">
            🏪
          </div>
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/10">
            {t("restaurantOwner")}
          </span>
          <div className="text-5xl mb-1 auth-float">🍽️</div>
        </div>

        {/* White body */}
        <div className="bg-white px-7 py-6 space-y-4">
          <div>
            <h3 className="text-xl font-black text-stone-900">
              {t("imMerchant")}
            </h3>
            <p className="text-stone-400 text-sm mt-1">{t("runRestaurant")}</p>
          </div>
          <ul className="space-y-2">
            {merchantPerks.map((p, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="shrink-0 h-5 w-5 bg-indigo-50 rounded-full flex items-center justify-center">
                  {p.icon}
                </span>
                <span className="text-stone-500 text-sm">{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm pt-1 group-hover:gap-3 transition-all duration-200">
            {t("registerRestaurant")} <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </button>
    </div>
  );
}

export default RolesCards;
