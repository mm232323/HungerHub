"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/shared/components/alerts/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { useGetDashboardProducts, useCreateOrder } from "@/apis";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface AddManualOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddManualOrderModal({ open, onOpenChange, onSuccess }: AddManualOrderModalProps) {
  const t = useTranslations("Dashboard.Orders");
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<{ productId: number; quantity: number }[]>([]);

  const { data: products } = useGetDashboardProducts();
  const createOrderMutation = useCreateOrder();

  const handleAddItem = (productId: number) => {
    if (!productId) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId) {
          const newQ = i.quantity + delta;
          return newQ > 0 ? { ...i, quantity: newQ } : i;
        }
        return i;
      })
    );
  };

  const handleRemoveItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error(t("errorNoItems"));
      return;
    }

    try {
      // Assuming merchantId is correctly inferred from the session on the backend for dashboard product fetching,
      // but the CreateOrder payload requires a merchantId. 
      // We will grab it from the first product fetched, or 0 if somehow empty (backend validation may catch it).
      const merchantId = products?.[0]?.merchantId || 0;

      await createOrderMutation.mutateAsync({
        data: {
          merchantId,
          items,
          address: address || "In-Store / Pick-up",
          paymentMethod,
          notes,
          customerName: customerName || "Guest User",
          customerPhone: customerPhone || undefined,
        }
      });
      
      toast.success(t("successCreated"));
      onSuccess();
      onOpenChange(false);
      
      // Reset form
      setCustomerName("");
      setCustomerPhone("");
      setAddress("");
      setPaymentMethod("Cash on Delivery");
      setNotes("");
      setItems([]);
    } catch (err: any) {
      toast.error(err?.message || t("errorFailed"));
    }
  };

  const calculateTotal = () => {
    if (!products) return 0;
    let total = 0;
    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        total += (product.discountPrice ?? product.price) * item.quantity;
      }
    });
    return total;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            {t("modalTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("modalDesc")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">{t("customerDetails")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("customerName")}</Label>
                <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder={t("customerNamePlaceholder")} />
              </div>
              <div className="space-y-2">
                <Label>{t("phoneNumber")}</Label>
                <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder={t("phoneNumberPlaceholder")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("addressOrderType")}</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("addressPlaceholder")} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">{t("orderItems")}</h3>
            <div className="flex gap-2">
              <Select onValueChange={(val) => handleAddItem(Number(val))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectProductPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {products?.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.name} - ${(p.discountPrice ?? p.price).toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {items.length > 0 && (
              <div className="bg-stone-50 border border-stone-100 rounded-xl p-3 space-y-3">
                {items.map((item) => {
                  const product = products?.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex items-center justify-between gap-2">
                      <div className="flex-1 truncate">
                        <p className="text-sm font-medium text-stone-800 truncate">{product.name}</p>
                        <p className="text-xs text-stone-500">${(product.discountPrice ?? product.price).toFixed(2)} {t("each")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => handleUpdateQuantity(item.productId, -1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => handleUpdateQuantity(item.productId, 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleRemoveItem(item.productId)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
                    <span className="text-sm font-semibold text-stone-600">{t("itemsSubtotal")}</span>
                    <span className="text-sm font-bold text-stone-900">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">{t("paymentAndNotes")}</h3>
            <div className="space-y-2">
              <Label>{t("paymentMethod")}</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash on Delivery">{t("cashOnDelivery")}</SelectItem>
                  <SelectItem value="Card / POS">{t("cardPos")}</SelectItem>
                  <SelectItem value="Online Transfer">{t("onlineTransfer")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("notesOptional")}</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("notesPlaceholder")} className="resize-none h-20" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={createOrderMutation.isPending}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={createOrderMutation.isPending || items.length === 0} className="bg-orange-600 hover:bg-orange-700 text-white">
              {createOrderMutation.isPending ? t("creating") : t("createOrder")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
