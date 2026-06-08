'use client'
import { Plus, Zap } from "lucide-react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";
import AdFormModal from "./AdFormModal";

function FeedPromotionHero() {
  const t = useTranslations("Dashboard.Marketing");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#2a221e' }} className="text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
      <div className="relative z-10 space-y-3 max-w-xl">
        <span style={{ backgroundColor: '#4a2b16' }} className="inline-flex items-center gap-1 text-orange-500 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 border border-orange-500/20">
          <Zap className="h-3 w-3" /> Sponsored Feed Ads
        </span>
        <h2 className="text-3xl font-bold">{t("heroTitle") || "Reach hungry customers on Discover"}</h2>
        <p className="text-[#a8a09b] text-sm md:text-base">
          {t("heroDesc") || "Your ad appears between posts in the Discover feed. Add a title, description, image and optionally link a menu item."}
        </p>
      </div>
      <div className="relative z-10 shrink-0">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium px-6 py-5"
        >
          <Plus className="h-4 w-4 mr-2" /> {t("createStoryAd") || "Create Ad"}
        </Button>
      </div>
      <AdFormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default FeedPromotionHero;
