"use client";

import React, { useState } from "react";
import { useCart } from "@/shared/contexts/CartContext";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useCreateOrder } from "@/apis/orders";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2, ArrowLeft, Loader2, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useUser } from "@clerk/nextjs";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useGetMerchant } from "@/apis/merchants";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

export default function CartPage() {
  const t = useTranslations("Cart");
  const { items, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const toastT = useTranslations("Toasts");
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();
  const { location } = useGeolocation();
  
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [notes, setNotes] = useState("");

  const merchantIdForQuery = items.length > 0 ? items[0].product.merchantId : null;
  const { data: merchant } = useGetMerchant(merchantIdForQuery as number, {
    query: { queryKey: ['getMerchant', merchantIdForQuery], enabled: !!merchantIdForQuery },
  });
  
  const deliveryFee = merchant?.deliveryFee || 0;

  const createOrder = useCreateOrder({
    mutation: {
      onSuccess: (order: any) => {
        toast({
          title: toastT("orderPlaced"),
          description: toastT("orderId", { id: order.id }),
        });
        clearCart();
        setIsProcessing(false);
        if (user) {
          router.push("/track");
        } else {
          router.push("/");
        }
      },
      onError: (error: any) => {
        toast({
          title: toastT("orderFailed"),
          description: error?.message || toastT("somethingWentWrong"),
          variant: "destructive",
        });
        setIsProcessing(false);
      },
    },
  });

  const handleApplyPromo = async () => {
    if (!promoInput || items.length === 0) return;
    setIsApplyingPromo(true);
    setPromoMessage("");

    try {
      const merchantId = items[0].product.merchantId;
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8080/v1";
      const apiUrl = baseUrl.includes("/v1") ? baseUrl : `${baseUrl}/v1`;
      
      const res = await fetch(`${apiUrl}/orders/validate-promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promoCode: promoInput,
          merchantId,
          subtotal: cartTotal,
        }),
      });

      const data = await res.json();
      if (data.valid) {
        setAppliedPromo(promoInput);
        setDiscount(data.discount);
        setPromoMessage(t("promoApplied") || "Promo code applied successfully!");
      } else {
        setAppliedPromo("");
        setDiscount(0);
        setPromoMessage(t("invalidPromo") || "Invalid promo code");
      }
    } catch (error) {
      setPromoMessage(t("failedPromo") || "Failed to apply promo code");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    if (!user) {
      if (!customerName || !customerPhone || !address) {
        toast({
          title: t("missingInfo") || "Missing Information",
          description: t("pleaseFillAllFields") || "Please fill in all required fields (Name, Phone, Address)",
          variant: "destructive",
        });
        return;
      }
    }

    setIsProcessing(true);

    const merchantId = items[0].product.merchantId;
    const orderItems = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const finalCustomerName = user?.fullName || user?.firstName || customerName;
    const finalCustomerPhone = user?.primaryPhoneNumber?.phoneNumber || customerPhone;
    const finalAddress = !user ? address : (location ? `Lat: ${location.lat}, Lng: ${location.lng}` : "Home Address");
    const finalPaymentMethod = !user ? paymentMethod : "cash";

    createOrder.mutate({
      data: {
        merchantId,
        items: orderItems,
        address: finalAddress,
        paymentMethod: finalPaymentMethod,
        promoCode: appliedPromo || undefined,
        customerName: finalCustomerName,
        customerPhone: finalCustomerPhone,
        notes: !user ? notes : undefined,
        deliveryFee,
      },
    });
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{t("yourCart") || "Your Cart"}</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-8 w-8 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t("emptyCart") || "Cart is empty"}</h2>
          <p className="text-gray-500 mb-6">{t("emptyCartDesc") || "Looks like you haven't added anything yet."}</p>
          <Button onClick={() => router.push("/")} className="rounded-full bg-orange-500 hover:bg-orange-600">
            {t("browseRestaurants") || "Browse Restaurants"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <Image
                    src={item.product.image || "https://placehold.co/200x200"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.product.name}</h3>
                  <p className="text-orange-500 font-bold mt-1">
                    ${(item.product.discountPrice || item.product.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center bg-gray-50 rounded-full border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t("enterPromo") || "Enter promo code"}
                  className="pl-9 bg-gray-50 border-transparent focus-visible:ring-orange-500 focus-visible:bg-white transition-all"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toLowerCase())}
                  disabled={isApplyingPromo}
                />
              </div>
              <Button 
                onClick={handleApplyPromo}
                disabled={!promoInput || isApplyingPromo}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6"
              >
                {isApplyingPromo ? <Loader2 className="h-4 w-4 animate-spin" /> : (t("apply") || "Apply")}
              </Button>
            </div>
            {promoMessage && (
              <p className={`text-sm font-medium ${appliedPromo ? 'text-green-600' : 'text-red-500'}`}>
                {promoMessage}
              </p>
            )}
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-gray-600">
                <span>{t("subtotal") || "Subtotal"}</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t("deliveryFee") || "Delivery Fee"}</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>{t("discount") || "Discount"} ({appliedPromo})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>{t("total") || "Total"}</span>
                <span>${Math.max(0, cartTotal + deliveryFee - discount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {!user && (
            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{t("checkoutDetails") || "Checkout Details"}</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("customerName") || "Full Name"} *</Label>
                  <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>{t("phoneNumber") || "Phone Number"} *</Label>
                  <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label>{t("addressOrderType") || "Delivery Address"} *</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Apt 4B" />
                </div>
                <div className="space-y-2">
                  <Label>{t("paymentMethod") || "Payment Method"}</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash on Delivery">{t("cashOnDelivery") || "Cash on Delivery"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Card payments are available for registered users only.</p>
                </div>
                <div className="space-y-2">
                  <Label>{t("notesOptional") || "Notes (Optional)"}</Label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions?" className="resize-none h-20" />
                </div>
              </div>
            </div>
          )}

          <Button
            className="w-full h-14 rounded-full text-lg font-bold bg-orange-500 hover:bg-orange-600 shadow-lg text-white"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              `${t("checkout") || "Checkout"} • $${Math.max(0, cartTotal + deliveryFee - discount).toFixed(2)}`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
