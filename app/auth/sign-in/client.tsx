"use client";

import { useState } from "react";
import { SignIn } from "@clerk/react";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { Utensils, ShoppingBag, LayoutDashboard, Star, Clock, Zap } from "lucide-react";
import { Role } from "@/types";

const basePath = "";

const clerkAppearance = {
  variables: {
    colorPrimary: "#F97316", // Beautiful brand orange accent
    colorBackground: "#FFFFFF", // Light background inside the form
    colorInputBackground: "#FFFFFF",
    colorInputText: "#1F2937",
    colorText: "#1F2937",
    colorTextSecondary: "#4B5563",
    colorDanger: "#EF4444",
    borderRadius: "12px",
    fontFamily: "var(--font-sans), sans-serif",
  },
  elements: {
    rootBox: {
      width: "100%",
      maxWidth: "440px",
      boxShadow: "none",
      border: "none",
    },
    cardBox: {
      boxShadow: "none",
      border: "none",
    },
    card: {
      backgroundColor: "transparent",
      boxShadow: "none",
      border: "none",
      width: "100%",
      padding: "0px",
    },
    headerTitle: {
      fontSize: "2.25rem",
      fontWeight: "800",
      letterSpacing: "-0.03em",
      color: "#1F2937",
    },
    headerSubtitle: {
      color: "#4B5563",
      fontSize: "0.95rem",
    },
    socialButtonsBlockButton: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #E5E7EB",
      color: "#1F2937",
      height: "50px",
      borderRadius: "12px",
      transition: "all 0.2s ease-in-out",
      '&:hover': {
        backgroundColor: "#F9FAFB",
        borderColor: "#F97316",
      },
    },
    socialButtonsBlockButtonText: {
      color: "#1F2937",
      fontWeight: "500",
    },
    dividerLine: {
      backgroundColor: "#E5E7EB",
    },
    dividerText: {
      color: "#6B7280",
    },
    formFieldInput: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #D1D5DB",
      color: "#1F2937",
      height: "50px",
      borderRadius: "12px",
      transition: "all 0.2s ease-in-out",
      '&:focus': {
        borderColor: "#F97316",
        boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.15)",
      },
    },
    formFieldLabel: {
      color: "#4B5563",
      fontWeight: "500",
    },
    formButtonPrimary: {
      backgroundColor: "#F97316",
      height: "50px",
      borderRadius: "12px",
      textTransform: "none",
      fontSize: "1.05rem",
      fontWeight: "600",
      transition: "all 0.2s ease-in-out",
      '&:hover': {
        backgroundColor: "#EA580C",
      },
    },
    footerActionText: {
      color: "#4B5563",
    },
    footerActionLink: {
      color: "#F97316",
      fontWeight: "600",
      transition: "all 0.15s ease-in-out",
      '&:hover': {
        color: "#EA580C",
      },
    },
    formFieldCheckboxInput: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #D1D5DB",
      '&:checked': {
        backgroundColor: "#F97316",
        borderColor: "#F97316",
      },
    },
    formFieldCheckboxLabel: {
      color: "#4B5563",
    },
    formFieldInputShowPasswordButton: {
      color: "#6B7280",
      '&:hover': {
        color: "#1F2937",
      },
    },
    footer: {
      '& a': {
        color: "#6B7280 !important",
      },
    },
    clerkLogoImage: {
      opacity: 0.7,
      filter: "grayscale(1)",
    },
  },
} as const;


const FOOD_EMOJIS = [
  { emoji: "🍕", top: "12%", left: "14%", size: "3.2rem", anim: "auth-float", delay: "0s", opacity: 0.85 },
  { emoji: "🍔", top: "8%", left: "72%", size: "2.6rem", anim: "auth-float-alt", delay: "0.6s", opacity: 0.75 },
  { emoji: "🌮", top: "62%", left: "6%", size: "2.8rem", anim: "auth-float-slow", delay: "1s", opacity: 0.8 },
  { emoji: "🍜", top: "78%", left: "78%", size: "2.4rem", anim: "auth-float", delay: "1.4s", opacity: 0.7 },
  { emoji: "🍣", top: "38%", left: "80%", size: "2rem", anim: "auth-float-alt", delay: "0.3s", opacity: 0.6 },
  { emoji: "🥗", top: "50%", left: "3%", size: "1.8rem", anim: "auth-float-slow", delay: "1.8s", opacity: 0.55 },
  { emoji: "🧁", top: "88%", left: "38%", size: "2rem", anim: "auth-float", delay: "0.9s", opacity: 0.65 },
  { emoji: "🍦", top: "22%", left: "44%", size: "1.6rem", anim: "auth-float-alt", delay: "2.1s", opacity: 0.5 },
];

export default function SignInClient() {
  const [role, setRole] = useState<Role>("customer");

  return (
    <div className="min-h-[100dvh] flex">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(145deg,#160800 0%,#2a1000 40%,#1a0a02 70%,#0d0500 100%)" }}>

        {/* Radial glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[520px] h-[520px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(249,115,22,0.30) 0%,transparent 65%)", bottom: "-60px", right: "-80px" }} />
          <div className="absolute w-[320px] h-[320px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(251,146,60,0.18) 0%,transparent 65%)", top: "10%", left: "-60px" }} />
        </div>

        {/* Floating food emojis */}
        {FOOD_EMOJIS.map((e, i) => (
          <span key={i} className={e.anim}
            style={{
              position: "absolute", top: e.top, left: e.left, fontSize: e.size, opacity: e.opacity,
              animationDelay: e.delay, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))", userSelect: "none"
            }}>
            {e.emoji}
          </span>
        ))}

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="bg-orange-500/20 backdrop-blur-sm p-2.5 rounded-2xl border border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
              <Utensils className="h-6 w-6 text-orange-400" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">FoodHub</span>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 space-y-8">
          {/* Headline */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-3 py-1.5">
              <Zap className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-orange-300 text-xs font-semibold tracking-wide uppercase">
                {role === "merchant" ? "Merchant Platform" : "Food Delivery"}
              </span>
            </div>
            <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
              {role === "merchant" ? (
                <>Manage your<br /><span className="text-orange-400">restaurant</span><br />with ease</>
              ) : (
                <>Food you'll<br /><span className="text-orange-400">actually</span><br />love</>
              )}
            </h1>
            <p className="text-white/55 text-base leading-relaxed max-w-xs">
              {role === "merchant"
                ? "Live orders, AI insights, and a full business dashboard — all in one place."
                : "Discover local gems, order in minutes, and track your delivery live."}
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: <Clock className="h-3.5 w-3.5" />, label: "20 min avg" },
              { icon: <Star className="h-3.5 w-3.5" />, label: "4.9 rating" },
              { icon: <ShoppingBag className="h-3.5 w-3.5" />, label: "8+ restaurants" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/8 border border-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="text-orange-400">{s.icon}</span>
                <span className="text-white/70 text-xs font-medium">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Floating order preview card */}
          <div className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-2xl p-4 max-w-xs shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🍕</div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">Margherita Pizza</p>
                <p className="text-white/50 text-xs">Smoke &amp; Ember Grill · $14.99</p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-full px-2.5 py-1">
                <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-bold">LIVE</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {["🧑", "👩", "👨"].map((a, i) => (
                  <span key={i} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 border border-white/20 text-xs">{a}</span>
                ))}
              </div>
              <span className="text-white/40 text-xs">+2,400 orders this week</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-white/25 text-xs">© 2026 HungerHub. All rights reserved.</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white text-stone-900 transition-colors duration-300">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-[#F97316] p-2 rounded-xl">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900">HungerHub</span>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center gap-5 auth-slide-up">

          {/* Back to site link */}
          <div className="w-[440px] max-w-full flex justify-end">
            <Link href="/" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
              ← Back to HungerHub
            </Link>
          </div>

          {/* Role switcher */}
          <div className="w-[440px] max-w-full">
            <div className="flex gap-1 p-1 bg-stone-100 rounded-xl w-fit">
              {(["customer", "merchant"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${role === r
                    ? "bg-[#F97316] text-white shadow"
                    : "text-stone-400 hover:text-stone-700"
                    }`}
                >
                  {r === "customer"
                    ? <ShoppingBag className="h-3.5 w-3.5" />
                    : <LayoutDashboard className="h-3.5 w-3.5" />}
                  {r === "customer" ? "Customer" : "Merchant"}
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
              New restaurant?{" "}
              <Link href="/auth/sign-up" className="font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors">
                Register as a merchant
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
