import { SignUp } from "@clerk/react";
import { Link } from "wouter";
import { Utensils, TrendingUp, Users, BarChart3 } from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function MerchantSignUpPage() {
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
            <span className="text-2xl font-bold tracking-tight">FoodHub</span>
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
              Join FoodHub as a merchant and reach thousands of hungry customers in your area.
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
          © 2026 FoodHub. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-background">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">FoodHub</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">Merchant Registration</p>
        </div>

        {/* Label above form */}
        <div className="hidden lg:block mb-2 w-[440px] max-w-full">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            Merchant Registration
          </span>
        </div>

        <SignUp
          routing="path"
          path={`${basePath}/merchant/sign-up`}
          signInUrl={`${basePath}/sign-in`}
          fallbackRedirectUrl={`${basePath}/merchant-setup`}
        />

        {/* Customer link */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Looking to order food?{" "}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            Create a customer account
          </Link>
        </div>
      </div>
    </div>
  );
}
