import React from "react";
import { Radio } from "lucide-react";
import { useTranslations } from "next-intl";

function MarketingEmptyState() {
  const t = useTranslations("Dashboard.Marketing");

  return (
    <div className="border border-dashed rounded-2xl p-12 mt-6 flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
        <Radio className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-2">{t("noAdsTitle") || "No ads yet"}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {t("noAdsDesc") || "Create your first ad to appear in the Discover feed."}
      </p>
    </div>
  );
}

export default MarketingEmptyState;
