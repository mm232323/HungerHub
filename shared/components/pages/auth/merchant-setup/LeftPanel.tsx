import { Utensils, Check, Flame } from "lucide-react";
import { getSteps } from "./constants";
import { useTranslations } from "next-intl";

export function LeftPanel({ step }: { step: number }) {
  const tSidebar = useTranslations("MerchantSetup.Sidebar");
  const tSteps = useTranslations("MerchantSetup.Steps");
  const STEPS = getSteps(tSteps);
  const tGlobal = useTranslations("Global");

  return (
    <div className="hidden lg:flex flex-col w-[420px] bg-stone-950 text-white p-10 relative overflow-hidden shrink-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 80%, rgba(249,115,22,0.15) 0%, transparent 50%),
                          radial-gradient(circle at 90% 20%, rgba(249,115,22,0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-16">
          <div className="bg-orange-500 p-2 rounded-xl">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">{tGlobal("brand")}</span>
        </div>

        {/* Headline */}
        <div className="mb-12">
          <h1 className="text-3xl font-black leading-tight mb-3">
            {tSidebar("welcome")}
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed">
            {tSidebar("description")}
          </p>
        </div>

        {/* Steps list */}
        <div className="space-y-4 flex-1">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isDone = step > s.id;
            const isCurrent = step === s.id;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  isCurrent
                    ? "bg-white/10 border border-white/10"
                    : "opacity-40"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${isDone ? "bg-orange-500" : isCurrent ? "bg-orange-500/20" : "bg-white/10"}`}
                >
                  {isDone ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <Icon
                      className={`h-4 w-4 ${isCurrent ? "text-orange-400" : "text-white/50"}`}
                    />
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${isCurrent ? "text-white" : "text-white/60"}`}
                  >
                    {s.title}
                  </p>
                  <p className="text-xs text-white/30">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom metrics */}
        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-orange-400" />
              <p className="text-sm text-white/70">{tSidebar("metrics.orders")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-orange-400" />
              <p className="text-sm text-white/70">{tSidebar("metrics.merchants")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-orange-400" />
              <p className="text-sm text-white/70">{tSidebar("metrics.support")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
