import React from "react";
import { useTranslations } from "next-intl";
import { Percent, Radio, Eye, MousePointerClick } from "lucide-react";

interface StatsProps {
  activePromotionsCount: number;
  liveAdsCount: number;
  totalImpressions: number;
  adClicks: number;
}

export default function MarketingStats({
  activePromotionsCount = 0,
  liveAdsCount = 0,
  totalImpressions = 0,
  adClicks = 0,
}: StatsProps) {
  const t = useTranslations("Dashboard.Marketing");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-background rounded-2xl p-6 shadow-sm border flex items-center gap-4">
        <div className="bg-orange-100 text-orange-500 p-3 rounded-xl flex-shrink-0">
          <Percent className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{activePromotionsCount}</h2>
          <p className="text-sm text-muted-foreground">{t("activePromotions") || "Active Promotions"}</p>
        </div>
      </div>

      <div className="bg-background rounded-2xl p-6 shadow-sm border flex items-center gap-4">
        <div className="bg-blue-100 text-blue-500 p-3 rounded-xl flex-shrink-0">
          <Radio className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{liveAdsCount}</h2>
          <p className="text-sm text-muted-foreground">{t("liveAds") || "Live Ads"}</p>
        </div>
      </div>

      <div className="bg-background rounded-2xl p-6 shadow-sm border flex items-center gap-4">
        <div className="bg-green-100 text-green-500 p-3 rounded-xl flex-shrink-0">
          <Eye className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{totalImpressions}</h2>
          <p className="text-sm text-muted-foreground">{t("totalImpressions") || "Total Impressions"}</p>
        </div>
      </div>

      <div className="bg-background rounded-2xl p-6 shadow-sm border flex items-center gap-4">
        <div className="bg-purple-100 text-purple-500 p-3 rounded-xl flex-shrink-0">
          <MousePointerClick className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{adClicks}</h2>
          <p className="text-sm text-muted-foreground">{t("adClicks") || "Ad Clicks"}</p>
        </div>
      </div>
    </div>
  );
}
