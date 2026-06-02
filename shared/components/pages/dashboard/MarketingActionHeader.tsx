'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../alerts/dialog";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useCreatePromotion, useListPromotions } from "@/apis";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

function MarketingActionHeader() {
  const t = useTranslations("Dashboard.Marketing");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { refetch } = useListPromotions({
    query: { queryKey: ["/api/promotions"] },
  });
  const createPromotion = useCreatePromotion({
    mutation: {
      onSuccess: () => {
        toast({ title: "Promotion created successfully" });
        setIsAddOpen(false);
        refetch();
      },
    },
  });
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> {t("newCampaign")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("createPromotion")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t("campaignTitle")}</Label>
              <Input placeholder={t("campaignTitlePlaceholder")} />
            </div>
            <div className="space-y-2">
              <Label>{t("promoCode")}</Label>
              <Input placeholder={t("promoCodePlaceholder")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("discountValue")}</Label>
                <Input
                  type="number"
                  placeholder={t("discountValuePlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("discountType")}</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="percentage">{t("typePercentage")}</option>
                  <option value="fixed">{t("typeFixed")}</option>
                  <option value="free_delivery">{t("typeFreeDelivery")}</option>
                </select>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                createPromotion.mutate({
                  data: {
                    title: "Summer Special 20%",
                    type: "percentage",
                    discount: 20,
                    code: "SUMMER20",
                    startDate: new Date().toISOString(),
                    endDate: new Date(
                      Date.now() + 7 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    isActive: true,
                  },
                });
              }}
            >
              {t("launchCampaign")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MarketingActionHeader;
