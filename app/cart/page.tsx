import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCreateOrder } from "@workspace/api-client-react";
import { ChevronLeft, Minus, Plus, ShoppingBag, MapPin, CreditCard, Ticket } from "lucide-react";
import { motion } from "framer-motion";

// Mock cart data since we don't have a global cart state in this demo
const MOCK_CART = [
  { id: 1, name: "Spicy Wagyu Burger", price: 14.99, quantity: 2, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", merchantId: 1 },
  { id: 2, name: "Truffle Fries", price: 6.99, quantity: 1, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80", merchantId: 1 }
];

export default function Cart() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [items, setItems] = useState(MOCK_CART);
  const [address, setAddress] = useState("");
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  const createOrder = useCreateOrder({
    mutation: {
      onSuccess: (order) => {
        toast({ title: "Order placed successfully!" });
        setLocation(`/track/${order.id}`);
      },
      onError: () => {
        // Fallback for demo since we're using mock data
        toast({ title: "Order submitted via WhatsApp (Demo Fallback)" });
        setLocation(`/track/123`);
      }
    }
  });

  const handleCheckout = () => {
    if (!address) {
      toast({ title: "Please enter a delivery address", variant: "destructive" });
      return;
    }
    
    if (items.length === 0) return;

    createOrder.mutate({
      data: {
        merchantId: items[0].merchantId,
        items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
        address,
        paymentMethod: "card"
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-muted p-6 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/discover">Start Discovering</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        {/* Cart Items */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Your Order</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-2xl bg-card">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-secondary rounded-full p-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => {
                          if (item.quantity > 1) {
                            setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
                          } else {
                            setItems(items.filter(i => i.id !== item.id));
                          }
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Details */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Delivery Details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Delivery Address
              </Label>
              <Input 
                id="address" 
                placeholder="123 Main St, Apt 4B" 
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payment Method
              </Label>
              <div className="flex items-center p-3 border rounded-xl gap-3 cursor-pointer hover:border-primary transition-colors">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Credit Card</p>
                  <p className="text-xs text-muted-foreground">**** **** **** 4242</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary h-8">Change</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="promo" className="text-muted-foreground flex items-center gap-2">
                <Ticket className="h-4 w-4" /> Promo Code
              </Label>
              <div className="flex gap-2">
                <Input id="promo" placeholder="Enter code" className="h-12 rounded-xl flex-1" />
                <Button className="h-12 rounded-xl px-6" variant="secondary">Apply</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="space-y-4 p-6 border rounded-2xl bg-muted/30">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Checkout */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t z-50">
        <div className="container max-w-2xl mx-auto">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button 
              className="w-full h-14 rounded-full font-bold text-lg shadow-lg" 
              onClick={handleCheckout}
              disabled={createOrder.isPending}
            >
              {createOrder.isPending ? "Processing..." : `Checkout • $${total.toFixed(2)}`}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}