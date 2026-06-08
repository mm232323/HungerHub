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
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed" | "free_delivery" | "bogo">("percentage");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { refetch } = useListPromotions({
    query: { queryKey: ["/api/promotions"] },
  });
  const createPromotion = useCreatePromotion({
    mutation: {
      onSuccess: () => {
        toast({ title: "Promotion created successfully" });
        setIsAddOpen(false);
        // Reset form
        setTitle("");
        setCode("");
        setDiscountValue("");
        setDiscountType("percentage");
        setStartDate("");
        setEndDate("");
        refetch();
      },
      onError: (error: any) => {
        toast({ title: "Failed to create promotion", description: error.message, variant: "destructive" });
      }
    },
  });

  const handleCreate = () => {
    if (!title || !code || !startDate || !endDate) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    createPromotion.mutate({
      data: {
        title,
        type: discountType,
        discount: Number(discountValue) || 0,
        code,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        isActive: true,
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">{t("activePromotions") || "Active Promotions"}</h2>
        <p className="text-muted-foreground mt-1">Create coupons and discount campaigns for your customers.</p>
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
              <Label>{t("campaignTitle")} *</Label>
              <Input 
                placeholder={t("campaignTitlePlaceholder") || "e.g., Summer Sale 2024"} 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("promoCode")} *</Label>
              <Input 
                placeholder={t("promoCodePlaceholder") || "e.g., SUMMER24"} 
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("discountValue")}</Label>
                <Input
                  type="number"
                  placeholder={t("discountValuePlaceholder") || "e.g., 20"}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("discountType")}</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                >
                  <option value="percentage">{t("typePercentage") || "Percentage (%)"}</option>
                  <option value="fixed">{t("typeFixed") || "Fixed Amount"}</option>
                  <option value="free_delivery">{t("typeFreeDelivery") || "Free Delivery"}</option>
                  <option value="bogo">Buy One Get One</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={createPromotion.isPending}
            >
              {createPromotion.isPending ? "Creating..." : t("launchCampaign")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MarketingActionHeader;
