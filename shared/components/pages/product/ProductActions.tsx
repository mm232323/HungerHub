"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/shared/contexts/CartContext";

function ProductActions({ product }: { product: Product }) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t z-50">
      <div className="container max-w-2xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center bg-secondary rounded-full p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
          <Button
            className="w-full h-14 rounded-full font-bold text-lg shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add • $
            {((product.discountPrice || product.price) * quantity).toFixed(2)}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductActions;
