import { useState } from "react";
import { SignUp } from "@clerk/react";
import { Link } from "wouter";
import {
  Utensils, ShoppingBag, LayoutDashboard, ArrowRight, ChevronLeft,
  Clock, MapPin, Heart, TrendingUp, Users, BarChart3, Check,
} from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

type Role = "customer" | "merchant" | null;

const BG_EMOJIS = [
  { emoji: "🍕", top: "8%",  left: "5%",   size: "3rem",   anim: "auth-float",      delay: "0s",   opacity: 0.20 },
  { emoji: "🍔", top: "15%", left: "88%",  size: "2.4rem", anim: "auth-float-alt",  delay: "0.8s", opacity: 0.15 },
  { emoji: "🌮", top: "72%", left: "4%",   size: "2.6rem", anim: "auth-float-slow", delay: "1.2s", opacity: 0.18 },
  { emoji: "🍜", top: "78%", left: "90%",  size: "2.2rem", anim: "auth-float",      delay: "0.5s", opacity: 0.14 },
  { emoji: "🍣", top: "45%", left: "92%",  size: "1.8rem", anim: "auth-float-alt",  delay: "1.6s", opacity: 0.12 },
  { emoji: "🧁", top: "85%", left: "48%",  size: "1.6rem", anim: "auth-float-slow", delay: "2s",   opacity: 0.12 },
  { emoji: "🥗", top: "5%",  left: "48%",  size: "1.6rem", anim: "auth-float",      delay: "1.9s", opacity: 0.10 },
];

const customerPerks = [
  { icon: <Clock className="h-4 w-4 text-orange-500" />,  text: "20-min average delivery" },
  { icon: <MapPin className="h-4 w-4 text-orange-500" />, text: "Live order tracking on map" },
  { icon: <Heart className="h-4 w-4 text-orange-500" />,  text: "Save favorites & reorder fast" },
];

const merchantPerks = [
  { icon: <TrendingUp className="h-4 w-4 text-indigo-400" />, text: "Real-time revenue analytics" },
  { icon: <Users className="h-4 w-4 text-indigo-400" />,      text: "Live kanban order board" },
  { icon: <BarChart3 className="h-4 w-4 text-indigo-400" />,  text: "AI-powered growth insights" },
];

function RoleSelector({ onSelect }: { onSelect: (r: "customer" | "merchant") => void }) {
  return (
    <div className="relative z-10 w-full max-w-2xl auth-slide-up">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 p-3 rounded-2xl group-hover:bg-orange-500/30 transition-colors">
            <Utensils className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-3xl font-black text-white tracking-tight">FoodHub</span>
        </Link>
      </div>

      {/* Headline */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-4xl font-black text-white">Join FoodHub</h1>
        <p className="text-white/45 text-base">How do you want to get started?</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Customer Card ── */}
        <button
          onClick={() => onSelect("customer")}
          className="group relative overflow-hidden rounded-3xl text-left transition-all duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
        >
          {/* Card glow on hover */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 0 40px rgba(249,115,22,0.35)", border: "1px solid rgba(249,115,22,0.5)" }} />

          {/* Top gradient section */}
          <div className="relative overflow-hidden px-7 pt-7 pb-10"
            style={{ background: "linear-gradient(135deg,#f97316 0%,#fb923c 40%,#fbbf24 100%)" }}>
            <div className="absolute -top-4 -right-4 text-7xl opacity-20 rotate-12 select-none">🍕</div>
            <div className="absolute bottom-2  right-14 text-4xl opacity-15 -rotate-6 select-none">🍔</div>
            <div className="absolute top-6 right-6 text-3xl opacity-20 rotate-6 select-none">🌮</div>
            <span className="inline-flex items-center gap-1.5 bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
              ⭐ Most popular
            </span>
            <div className="text-5xl mb-1 auth-float-alt">🛒</div>
          </div>

          {/* White body */}
          <div className="bg-white px-7 py-6 space-y-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">I'm a customer</h3>
              <p className="text-stone-400 text-sm mt-1">Browse, order, and track your favourite food.</p>
            </div>
            <ul className="space-y-2">
              {customerPerks.map((p, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="shrink-0 h-5 w-5 bg-orange-50 rounded-full flex items-center justify-center">{p.icon}</span>
                  <span className="text-stone-500 text-sm">{p.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-sm pt-1 group-hover:gap-3 transition-all duration-200">
              Get started <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </button>

        {/* ── Merchant Card ── */}
        <button
          onClick={() => onSelect("merchant")}
          className="group relative overflow-hidden rounded-3xl text-left transition-all duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
        >
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 0 40px rgba(99,102,241,0.30)", border: "1px solid rgba(99,102,241,0.45)" }} />

          {/* Top gradient section */}
          <div className="relative overflow-hidden px-7 pt-7 pb-10"
            style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4338ca 100%)" }}>
            <div className="absolute -top-4 -right-4 text-7xl opacity-10 rotate-12 select-none">📊</div>
            <div className="absolute bottom-2  right-14 text-4xl opacity-10 -rotate-6 select-none">💹</div>
            <div className="absolute top-6 right-6 text-3xl opacity-15 rotate-6 select-none">🏪</div>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/10">
              🏪 Restaurant owner
            </span>
            <div className="text-5xl mb-1 auth-float">🍽️</div>
          </div>

          {/* White body */}
          <div className="bg-white px-7 py-6 space-y-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">I'm a merchant</h3>
              <p className="text-stone-400 text-sm mt-1">Run your restaurant + still order food.</p>
            </div>
            <ul className="space-y-2">
              {merchantPerks.map((p, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="shrink-0 h-5 w-5 bg-indigo-50 rounded-full flex items-center justify-center">{p.icon}</span>
                  <span className="text-stone-500 text-sm">{p.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm pt-1 group-hover:gap-3 transition-all duration-200">
              Register restaurant <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </button>
      </div>

      {/* Sign-in link */}
      <p className="text-center text-sm text-white/35 mt-8">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-orange-400 hover:text-orange-300 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignUpPage() {
  const [role, setRole] = useState<Role>(null);

  const isFullscreen = !role;

  return (
    <div className={`min-h-[100dvh] ${isFullscreen ? "flex flex-col items-center justify-center px-4 py-12" : "flex"}`}
      style={isFullscreen ? { background: "linear-gradient(145deg,#160800 0%,#2a1000 40%,#1a0a02 70%,#0d0500 100%)" } : {}}>

      {/* Full-screen background elements (role selector only) */}
      {isFullscreen && (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[600px] h-[600px] rounded-full"
              style={{ background: "radial-gradient(circle,rgba(249,115,22,0.22) 0%,transparent 65%)", bottom: "-100px", right: "-100px" }} />
            <div className="absolute w-[400px] h-[400px] rounded-full"
              style={{ background: "radial-gradient(circle,rgba(251,146,60,0.12) 0%,transparent 65%)", top: "5%", left: "-80px" }} />
          </div>
          {BG_EMOJIS.map((e, i) => (
            <span key={i} className={e.anim}
              style={{ position: "fixed", top: e.top, left: e.left, fontSize: e.size, opacity: e.opacity,
                animationDelay: e.delay, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))", userSelect: "none", pointerEvents: "none" }}>
              {e.emoji}
            </span>
          ))}
          <RoleSelector onSelect={setRole} />
        </>
      )}

      {/* After role selection: split layout (same as sign-in) */}
      {!isFullscreen && (
        <>
          {/* Left panel */}
          <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
            style={{ background: "linear-gradient(145deg,#160800 0%,#2a1000 40%,#1a0a02 70%,#0d0500 100%)" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-[520px] h-[520px] rounded-full"
                style={{ background: "radial-gradient(circle,rgba(249,115,22,0.30) 0%,transparent 65%)", bottom: "-60px", right: "-80px" }} />
            </div>
            {BG_EMOJIS.slice(0, 5).map((e, i) => (
              <span key={i} className={e.anim}
                style={{ position: "absolute", top: e.top, left: e.left, fontSize: e.size, opacity: (e.opacity + 0.4), animationDelay: e.delay,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))", userSelect: "none" }}>
                {e.emoji}
              </span>
            ))}

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 p-2.5 rounded-2xl">
                  <Utensils className="h-6 w-6 text-orange-400" />
                </div>
                <span className="text-2xl font-bold text-white">FoodHub</span>
              </Link>
            </div>

            <div className="relative z-10 space-y-5">
              <h1 className="text-5xl font-black text-white leading-[1.1]">
                {role === "merchant" ? (
                  <>Grow your<br /><span className="text-orange-400">restaurant</span><br />today</>
                ) : (
                  <>Food you'll<br /><span className="text-orange-400">actually</span><br />love</>
                )}
              </h1>
              <ul className="space-y-3">
                {(role === "merchant" ? merchantPerks : customerPerks).map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="h-7 w-7 bg-white/8 border border-white/12 rounded-full flex items-center justify-center shrink-0">
                      {p.icon}
                    </span>
                    <span className="text-white/65 text-sm">{p.text}</span>
                  </li>
                ))}
              </ul>
              {/* Role badge */}
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 border ${
                role === "merchant"
                  ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-300"
                  : "bg-orange-500/10 border-orange-500/25 text-orange-300"
              }`}>
                <Check className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold">{role === "merchant" ? "Merchant account" : "Customer account"} selected</span>
              </div>
            </div>

            <p className="relative z-10 text-white/20 text-xs">© 2026 FoodHub. All rights reserved.</p>
          </div>

          {/* Right panel */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white">

            {/* Mobile logo */}
            <div className="lg:hidden mb-8">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="bg-orange-500 p-2 rounded-xl">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">FoodHub</span>
              </Link>
            </div>

            <div className="w-full flex flex-col items-center gap-4 auth-slide-up">
              {/* Back + role badge row */}
              <div className="w-[440px] max-w-full flex items-center justify-between">
                <button
                  onClick={() => setRole(null)}
                  className="flex items-center gap-1 text-stone-400 hover:text-stone-700 text-sm transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Change role
                </button>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                  role === "merchant"
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-orange-50 text-orange-600"
                }`}>
                  {role === "merchant" ? <LayoutDashboard className="h-3 w-3" /> : <ShoppingBag className="h-3 w-3" />}
                  {role === "merchant" ? "Merchant" : "Customer"}
                </span>
              </div>

              <SignUp
                key={`signup-${role}`}
                routing="path"
                path={`${basePath}/sign-up`}
                signInUrl={`${basePath}/sign-in`}
                fallbackRedirectUrl={
                  role === "merchant"
                    ? `${basePath}/merchant-setup`
                    : `${basePath}/`
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
