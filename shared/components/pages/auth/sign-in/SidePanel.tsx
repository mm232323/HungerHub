import { Clock, ShoppingBag, Star, Utensils, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FOOD_EMOJIS } from "./data";
import { useTranslations } from "next-intl";

function SidePanel({ role }: { role: "customer" | "merchant" | null }) {
  const t = useTranslations("Auth.SignIn");
  const tShared = useTranslations("Auth.shared");
  const tGlobal = useTranslations("Global");

  return (
    <div
      className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
      style={{
        background:
          "linear-gradient(145deg,#160800 0%,#2a1000 40%,#1a0a02 70%,#0d0500 100%)",
      }}
    >
      {/* Radial glow blobs */}
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
        <div
          className="absolute w-[320px] h-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(251,146,60,0.18) 0%,transparent 65%)",
            top: "10%",
            left: "-60px",
          }}
        />
      </div>

      {/* Floating food emojis */}
      {FOOD_EMOJIS.map((e, i) => (
        <span
          key={i}
          className={e.anim}
          style={{
            position: "absolute",
            top: e.top,
            left: e.left,
            fontSize: e.size,
            opacity: e.opacity,
            animationDelay: e.delay,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
            userSelect: "none",
          }}
        >
          {e.emoji}
        </span>
      ))}

      {/* Logo */}
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="bg-orange-500/20 backdrop-blur-sm p-2.5 rounded-2xl border border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
            <Utensils className="h-6 w-6 text-orange-400" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            {tGlobal("brand")}
          </span>
        </Link>
      </div>

      {/* Center Content */}
      <div className="relative z-10 space-y-8">
        {/* Headline */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-orange-300 text-xs font-semibold tracking-wide uppercase">
              {role === "merchant" ? t("merchantPlatform") : t("foodDelivery")}
            </span>
          </div>
          <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
            {role === "merchant" ? (
              <>
                {t("manageYour")}
                <br />
                <span className="text-orange-400">{t("restaurant")}</span>
                <br />
                {t("withEase")}
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
          <p className="text-white/55 text-base leading-relaxed max-w-xs">
            {role === "merchant" ? t("merchantDesc") : t("customerDesc")}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 flex-wrap">
          {[
            { icon: <Clock className="h-3.5 w-3.5" />, label: t("avgTime") },
            { icon: <Star className="h-3.5 w-3.5" />, label: t("rating") },
            {
              icon: <ShoppingBag className="h-3.5 w-3.5" />,
              label: t("restaurantsCount"),
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-white/8 border border-white/10 backdrop-blur-sm rounded-full px-3 py-1.5"
            >
              <span className="text-orange-400">{s.icon}</span>
              <span className="text-white/70 text-xs font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Floating order preview card */}
        <div className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-2xl p-4 max-w-xs shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🍕</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {t("pizzaName")}
              </p>
              <p className="text-white/50 text-xs">{t("pizzaDesc")}</p>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-full px-2.5 py-1">
              <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold">
                {t("live")}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {["🧑", "👩", "👨"].map((a, i) => (
                <span
                  key={i}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 border border-white/20 text-xs"
                >
                  {a}
                </span>
              ))}
            </div>
            <span className="text-white/40 text-xs">{t("ordersCount")}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-white/25 text-xs">
        {tShared("copyright")}
      </p>
    </div>
  );
}

export default SidePanel;
