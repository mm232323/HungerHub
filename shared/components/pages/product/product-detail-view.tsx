"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export type ProductDetailViewProps = {
  product: Product | null;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  if (!product) {
    return <div className="p-4 text-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50">
        <Link href={`/merchant/${product.merchantId}`}>
          <Button variant="secondary" size="icon" className="rounded-full shadow-md bg-background/80 backdrop-blur-md">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-muted rounded-b-[2rem] overflow-hidden shadow-sm">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="text-2xl font-bold text-primary">
              ${(product.discountPrice || product.price).toFixed(2)}
            </div>
          </div>
          {product.discountPrice && (
            <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
          )}

          <Link href={`/merchant/${product.merchantId}`} className="inline-block text-sm font-medium text-muted-foreground hover:text-primary">
            By {product.merchantName || 'Merchant'}
          </Link>
        </div>

        {product.rating && (
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
        )}

        <div className="space-y-3 pt-4 border-t">
          <h3 className="font-semibold text-lg">Details</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {product.ingredients && product.ingredients.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ing => (
                <span key={ing} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.nutritionalInfo && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">Nutritional Info</h3>
            <p className="text-sm text-muted-foreground">{product.nutritionalInfo}</p>
          </div>
        )}
      </div>

      {/* Floating Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t z-50">
        <div className="container max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center bg-secondary rounded-full p-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => setQuantity(quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
            <Button className="w-full h-14 rounded-full font-bold text-lg shadow-lg" onClick={handleAddToCart}>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add • ${((product.discountPrice || product.price) * quantity).toFixed(2)}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
