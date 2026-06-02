"use client";

import React, { useState } from "react";
import { useCart } from "@/shared/contexts/CartContext";
import { Button } from "@/shared/components/ui/button";
import { useCreateOrder } from "@/apis/orders";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = useCreateOrder({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Order Placed Successfully!",
          description: "Your order has been sent to the merchant.",
        });
        clearCart();
        setIsProcessing(false);
        router.push("/orders"); // Or redirect to home/dashboard
      },
      onError: (error: any) => {
        toast({
          title: "Checkout Failed",
          description: error?.message || "Something went wrong.",
          variant: "destructive",
        });
        setIsProcessing(false);
      },
    },
  });

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    // Group items by merchant. In a real app with multiple merchants, we'd create multiple orders or restrict cart to 1 merchant.
    // For now, let's just create an order for the first merchant in the cart.
    const merchantId = items[0].product.merchantId;
    const orderItems = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    createOrder.mutate({
      data: {
        merchantId,
        items: orderItems,
        address: "Home Address", // Temporary placeholder
        paymentMethod: "card",
      },
    });
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-8 w-8 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
          <Button onClick={() => router.push("/")} className="rounded-full bg-orange-500 hover:bg-orange-600">
            Browse Restaurants
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

          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(cartTotal + 2.99).toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full h-14 rounded-full text-lg font-bold bg-orange-500 hover:bg-orange-600 shadow-lg"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              `Buy Now • ${(cartTotal + 2.99).toFixed(2)}`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
