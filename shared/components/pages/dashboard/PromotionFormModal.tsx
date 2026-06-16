'use client'
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../alerts/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useCreatePromotion, useUpdatePromotion, useListPromotions } from "@/apis";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { Promotion } from "@/types";

interface PromotionFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  promotionToEdit?: Promotion | null;
}

export default function PromotionFormModal({ isOpen, setIsOpen, promotionToEdit }: PromotionFormModalProps) {
  const toastT = useTranslations("Toasts");
  const t = useTranslations("Dashboard.Marketing");
  
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed" | "free_delivery" | "bogo">("percentage");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { refetch } = useListPromotions({
    query: { queryKey: ["/api/promotions"] },
  });

  const createPromotion = useCreatePromotion({
    mutation: {
      onSuccess: () => {
        toast({ title: toastT("promoCreated") || "Promotion Created" });
        setIsOpen(false);
        refetch();
      },
      onError: (error: any) => {
        const desc = error?.data?.error || error.message;
        toast({ title: toastT("promoFailed") || "Creation Failed", description: desc, variant: "destructive" });
      }
    },
  });

  const updatePromotion = useUpdatePromotion({
    mutation: {
      onSuccess: () => {
        toast({ title: toastT("promoUpdated") || "Promotion Updated" });
        setIsOpen(false);
        refetch();
      },
      onError: (error: any) => {
        const desc = error?.data?.error || error.message;
        toast({ title: toastT("promoUpdateFailed") || "Update Failed", description: desc, variant: "destructive" });
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (promotionToEdit) {
        setTitle(promotionToEdit.title || "");
        setCode(promotionToEdit.code || "");
        setDiscountValue(promotionToEdit.discount?.toString() || "");
        setDiscountType(promotionToEdit.type || "percentage");
        setStartDate(promotionToEdit.startDate ? new Date(promotionToEdit.startDate).toISOString().split('T')[0] : "");
        setEndDate(promotionToEdit.endDate ? new Date(promotionToEdit.endDate).toISOString().split('T')[0] : "");
        setIsActive(promotionToEdit.isActive ?? true);
      } else {
        setTitle("");
        setCode("");
        setDiscountValue("");
        setDiscountType("percentage");
        setStartDate("");
        setEndDate("");
        setIsActive(true);
      }
    }
  }, [isOpen, promotionToEdit]);

  const handleSave = () => {
    if (!title || !code || !startDate || !endDate) {
      toast({ title: toastT("fillFields") || "Please fill all required fields", variant: "destructive" });
      return;
    }

    const payload = {
      title,
      type: discountType,
      discount: Number(discountValue) || 0,
      code,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      isActive,
    };

    if (promotionToEdit) {
      updatePromotion.mutate({
        id: promotionToEdit.id,
        data: payload,
      });
    } else {
      createPromotion.mutate({
        data: payload,
      });
    }
  };

  const isPending = createPromotion.isPending || updatePromotion.isPending;
  const isEdit = !!promotionToEdit;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? (t("editPromotion") || "Edit Promotion") : t("createPromotion")}</DialogTitle>
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
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("startDate") || "Start Date *"}</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("endDate") || "End Date *"}</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          {isEdit && (
            <div className="flex items-center gap-2 pt-2 pb-4">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                {t("isActive") || "Promotion is active"}
              </Label>
            </div>
          )}

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? (t("saving") || "Saving...") : (isEdit ? (t("saveChanges") || "Save Changes") : t("launchCampaign"))}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
