"use client";

import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/shared/components/alerts/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/shared/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export function CartDrawer() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart();
  const t = useTranslations("Cart");
  const router = useRouter();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-orange-50 transition-colors w-10 h-10 rounded-full">
          <ShoppingBag className="h-5 w-5 text-stone-700" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingBag className="h-5 w-5 text-orange-500" />
            {t("yourCart") || "Your Cart"}
            <span className="text-sm font-normal text-muted-foreground ms-auto mr-8 rtl:mr-0 rtl:ml-8">
              {itemCount} {itemCount === 1 ? (t("item") || "Item") : (t("items") || "Items")}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="bg-orange-50 p-6 rounded-full">
                <ShoppingBag className="h-12 w-12 text-orange-200" />
              </div>
              <h3 className="text-lg font-bold text-stone-800">{t("emptyCart") || "Your cart is empty"}</h3>
              <p className="text-stone-500 text-sm max-w-[200px]">{t("emptyCartDesc") || "Looks like you haven't added anything to your cart yet."}</p>
              <SheetClose asChild>
                <Button variant="outline" className="mt-4 rounded-full">{t("continueShopping") || "Continue Shopping"}</Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const price = item.product.discountPrice || item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-4 items-center bg-white border rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border">
                      <img src={item.product.image || "/placeholder.png"} alt={item.product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-stone-800 truncate">{item.product.name}</h4>
                      <p className="text-orange-600 font-semibold text-sm">${price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 bg-stone-100 rounded-full p-0.5 border">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-white hover:shadow-sm rounded-full transition-all">
                            <Minus className="h-3 w-3 text-stone-600" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-white hover:shadow-sm rounded-full transition-all">
                            <Plus className="h-3 w-3 text-stone-600" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ms-auto">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600 font-medium">{t("subtotal") || "Subtotal"}</span>
              <span className="text-xl font-bold text-stone-800">${cartTotal.toFixed(2)}</span>
            </div>
            <SheetClose asChild>
              <Button 
                onClick={() => router.push("/cart")} 
                className="w-full h-12 rounded-full text-base font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                {t("goToCart") || "Go to Cart"}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
