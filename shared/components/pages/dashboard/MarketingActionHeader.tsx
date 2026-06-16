'use client'
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import PromotionFormModal from "./PromotionFormModal";

function MarketingActionHeader() {
  const t = useTranslations("Dashboard.Marketing");
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">{t("activePromotions") || "Active Promotions"}</h2>
        <p className="text-muted-foreground mt-1">{t("marketingDesc") || "Create coupons and discount campaigns for your customers."}</p>
      </div>

      <Button onClick={() => setIsAddOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> {t("newCampaign")}
      </Button>

      <PromotionFormModal 
        isOpen={isAddOpen} 
        setIsOpen={setIsAddOpen} 
      />
    </div>
  );
}

export default MarketingActionHeader;
