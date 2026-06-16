'use client'

import { useCreateOrder } from "@/apis";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import CartItems from "@/shared/components/pages/cart/CartItems";
import DeliveryDetails from "@/shared/components/pages/cart/DeliveryDetails";
import FloatingCheckout from "@/shared/components/pages/cart/FloatingCheckout";
import OrderSummary from "@/shared/components/pages/cart/OrderSummary";
import { Button } from "@/shared/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useGetMerchant } from "@/apis/merchants";
import { useUser } from "@clerk/nextjs";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function CartPageClient() {
  const router = useRouter();
  const toastT = useTranslations("Toasts");
  const { toast } = useToast();
  const { user } = useUser();
  const { location } = useGeolocation();
  const [items, setItems] = useState<
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
      image: string;
      merchantId: number;
    }[]
  >([]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-muted p-6 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/discover">Start Discovering</Link>
        </Button>
      </div>
    );
  }

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (location && !address) {
      setAddress(`Lat: ${location.lat}, Lng: ${location.lng}`);
    }
  }, [location]);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const merchantId = items.length > 0 ? items[0].merchantId : null;
  const { data: merchant } = useGetMerchant(merchantId as number, {
    query: { queryKey: ['getMerchant', merchantId], enabled: !!merchantId },
  });

  const deliveryFee = merchant?.deliveryFee || 0;
  const total = subtotal + deliveryFee;
  const createOrder = useCreateOrder({
    mutation: {
      onSuccess: (order) => {
        toast({ title: toastT("orderPlaced") });
        router.push(`/track/${order.id}`);
      },
      onError: () => {
        toast({ title: toastT("orderWhatsApp") });
        router.push(`/track/123`);
      },
    },
  });

  const handleCheckout = () => {
    if (!address) {
      toast({
        title: toastT("orderFailed"),
        description: toastT("enterAddress"),
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) return;

    createOrder.mutate({
      data: {
        merchantId: items[0].merchantId,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        address,
        paymentMethod: "cash",
        customerName: user?.fullName || undefined,
        customerPhone: user?.primaryPhoneNumber?.phoneNumber || undefined,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
        <CartItems
          items={items}
          updateItems={(updatedItems) => setItems(updatedItems)}
        />
        <DeliveryDetails
          address={address}
          updateAddress={(newAddress) => setAddress(newAddress)}
        />
        <OrderSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
      <FloatingCheckout
        handleCheckout={handleCheckout}
        createOrder={createOrder}
        total={total}
      />
    </div>
  );
}
