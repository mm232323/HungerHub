import { ShoppingBag, Store, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

function StatsBar() {
  const t = useTranslations("HomePage");
  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-3 divide-x divide-border max-w-2xl mx-auto text-center">
          {[
            {
              icon: <Store className="h-4 w-4" />,
              value: "8+",
              label: t("stats.merchants"),
            },
            {
              icon: <ShoppingBag className="h-4 w-4" />,
              value: "17+",
              label: t("stats.dishes"),
            },
            {
              icon: <Zap className="h-4 w-4" />,
              value: "20 min",
              label: t("stats.delivery"),
            },
          ].map(({ icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                {icon}
                {value}
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
