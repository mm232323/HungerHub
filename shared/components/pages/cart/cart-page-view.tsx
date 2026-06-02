"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCreateOrder } from "@/utils/api";
import { Minus, Plus, ShoppingBag, MapPin, CreditCard, Ticket } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_CART = [
  { id: 1, name: "Spicy Wagyu Burger", price: 14.99, quantity: 2, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", merchantId: 1 },
  { id: 2, name: "Truffle Fries", price: 6.99, quantity: 1, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80", merchantId: 1 }
];

export function CartPageView() {

  


 

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
     

        {/* Delivery Details */}
      

        {/* Order Summary */}
    
      </div>

      {/* Floating Checkout */}
     
    </div>
  );
}
