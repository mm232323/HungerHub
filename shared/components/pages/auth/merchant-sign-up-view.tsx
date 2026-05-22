"use client";

import { SignUp } from "@clerk/react";
import Link from "next/link";
import { Utensils, TrendingUp, Users, BarChart3 } from "lucide-react";

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


export function MerchantSignUpView() {
  return (
    <div className="min-h-[100dvh] flex">
      {/* Left Panel — merchant-themed */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full" />
          <div className="absolute bottom-0 -left-16 w-64 h-64 bg-orange-500/10 rounded-full" />
          <div className="absolute top-1/2 right-8 w-32 h-32 bg-white/5 rounded-full" />
        </div>

        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="bg-orange-500/20 backdrop-blur-sm p-2.5 rounded-2xl">
              <Utensils className="h-6 w-6 text-orange-400" />
            </div>
            <span className="text-2xl font-bold tracking-tight">HungerHub</span>
            <span className="text-sm font-semibold px-2.5 py-1 bg-orange-500/20 text-orange-300 rounded-full">
              For Merchants
            </span>
          </Link>
        </div>

        <div className="relative space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">
              Grow your<br />restaurant business
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Join HungerHub as a merchant and reach thousands of hungry customers in your area.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
              <TrendingUp className="h-5 w-5 text-orange-400 shrink-0" />
              <div>
                <span className="text-sm font-medium block">Real-time revenue analytics</span>
                <span className="text-xs text-white/50">AI-powered insights to grow faster</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
              <Users className="h-5 w-5 text-orange-400 shrink-0" />
              <div>
                <span className="text-sm font-medium block">Live order management</span>
                <span className="text-xs text-white/50">Kanban board from new to delivered</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
              <BarChart3 className="h-5 w-5 text-orange-400 shrink-0" />
              <div>
                <span className="text-sm font-medium block">Promotional campaigns</span>
                <span className="text-xs text-white/50">Run deals and track performance</span>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-white/40 text-sm">
          © 2026 HungerHub. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white text-stone-900 transition-colors duration-300">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-[#F97316] p-2 rounded-xl">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900">HungerHub</span>
          </Link>
          <p className="text-sm text-stone-400 mt-1">Merchant Registration</p>
        </div>

        <div className="w-full flex flex-col items-center auth-slide-up">
          {/* Label above form */}
          <div className="hidden lg:block mb-2 w-[440px] max-w-full text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F97316]">
              Merchant Registration
            </span>
          </div>

          <SignUp
            routing="path"
            path={`${basePath}/auth/merchant-sign-up`}
            signInUrl={`${basePath}/auth/sign-in`}
            fallbackRedirectUrl={`${basePath}/auth/merchant-setup`}
            appearance={clerkAppearance}
          />
        </div>

        {/* Customer link */}
        <div className="mt-6 text-center text-sm text-stone-400">
          Looking to order food?{" "}
          <Link href="/auth/sign-up" className="font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors">
            Create a customer account
          </Link>
        </div>
      </div>
    </div>
  );
}
