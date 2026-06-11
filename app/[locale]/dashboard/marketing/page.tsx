import { getPromotions } from "@/lib/server-api";
import MarketingStats from "@/shared/components/pages/dashboard/MarketingStats";
import MarketingTabs from "@/shared/components/pages/dashboard/MarketingTabs";

import { getTranslations } from "next-intl/server";

export default async function DashboardMarketingPage() {
  const t = await getTranslations("Dashboard.Marketing");
  const data = await getPromotions();
  
  // Hardcoding stats for now since backend doesn't provide them yet
  const activePromotionsCount = data.filter(p => p.isActive).length;
  const liveAdsCount = 0;
  const totalImpressions = 0;
  const adClicks = 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title") || "Marketing & Ads"}</h1>
        <p className="text-muted-foreground mt-1">{t("marketingDesc") || "Grow your restaurant with promotions and sponsored content."}</p>
      </div>

      <MarketingStats 
        activePromotionsCount={activePromotionsCount}
        liveAdsCount={liveAdsCount}
        totalImpressions={totalImpressions}
        adClicks={adClicks}
      />

      <MarketingTabs promotions={data} />
    </div>
  );
}
