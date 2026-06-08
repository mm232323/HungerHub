'use client'
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { BadgePercent, Radio } from "lucide-react";
import MarketingActionHeader from "./MarketingActionHeader";
import CardsContainer from "./CardsContainer";
import FeedPromotionHero from "./FeedPromotionHero";
import AdsList from "./AdsList";
import { Promotion } from "@/types";
import { useListPromotions } from "@/apis";

interface MarketingTabsProps {
  promotions?: Promotion[];
}

export default function MarketingTabs({ promotions: initialPromotions }: MarketingTabsProps) {
  const t = useTranslations("Dashboard.Marketing");
  const [activeTab, setActiveTab] = useState<"promotions" | "ads">("promotions");
  
  const { data: listData } = useListPromotions({
    query: { queryKey: ["/api/promotions"] },
  });
  
  const promotions = (listData as unknown as Promotion[]) || initialPromotions || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6 bg-muted/40 p-1 rounded-xl inline-flex">
        <button
          onClick={() => setActiveTab("promotions")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            activeTab === "promotions"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BadgePercent className={`h-4 w-4 ${activeTab === 'promotions' ? 'text-orange-500' : ''}`} />
          {t("couponsAndPromotions") || "Coupons & Promotions"}
        </button>
        <button
          onClick={() => setActiveTab("ads")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            activeTab === "ads"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Radio className={`h-4 w-4 ${activeTab === 'ads' ? 'text-orange-500' : ''}`} />
          {t("discoverFeedAds") || "Discover Feed Ads"}
        </button>
      </div>

      {activeTab === "promotions" && (
        <div className="space-y-6">
          <MarketingActionHeader />
          <CardsContainer promotions={promotions} />
        </div>
      )}

      {activeTab === "ads" && (
        <div className="space-y-6">
          <FeedPromotionHero />
          <AdsList />
        </div>
      )}
    </div>
  );
}
