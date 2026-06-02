import { Megaphone } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";

function FeedPromotionHero() {
  const t = useTranslations("Dashboard.Marketing");

  return (
    <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 text-primary-foreground/10">
        <Megaphone className="h-64 w-64" />
      </div>
      <div className="relative z-10 space-y-3 max-w-xl">
        <h2 className="text-2xl font-bold">{t("heroTitle")}</h2>
        <p className="text-primary-foreground/90">{t("heroDesc")}</p>
      </div>
      <div className="relative z-10 shrink-0">
        <Button
          variant="secondary"
          size="lg"
          className="rounded-full font-bold"
        >
          {t("createStoryAd")}
        </Button>
      </div>
    </div>
  );
}

export default FeedPromotionHero;
