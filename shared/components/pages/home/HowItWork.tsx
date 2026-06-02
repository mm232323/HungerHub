import { useTranslations } from "next-intl";
import React from "react";

function HowItWork() {
  const t = useTranslations("HomePage");

  return (
    <section className="py-16 px-4 bg-muted/40">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">{t("howItWorks.title")}</h2>
          <p className="text-muted-foreground mt-2">
            {t("howItWorks.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              emoji: "🔍",
              title: t("howItWorks.steps.1.title"),
              desc: t("howItWorks.steps.1.desc"),
            },
            {
              step: "02",
              emoji: "🛒",
              title: t("howItWorks.steps.2.title"),
              desc: t("howItWorks.steps.2.desc"),
            },
            {
              step: "03",
              emoji: "🚀",
              title: t("howItWorks.steps.3.title"),
              desc: t("howItWorks.steps.3.desc"),
            },
          ].map(({ step, emoji, title, desc }) => (
            <div
              key={step}
              className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border shadow-sm"
            >
              <span className="text-4xl mb-4">{emoji}</span>
              <span className="text-xs font-bold text-primary/60 tracking-widest mb-1">
                {t("howItWorks.step")} {step}
              </span>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
