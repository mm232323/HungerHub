"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus, Plus, ShoppingBag, Star, MapPin, Truck, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useCart } from "@/shared/contexts/CartContext";
import { useUser } from "@clerk/react";

export type ProductDetailViewProps = {
  product: Product | null;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomization, setSelectedCustomization] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { isSignedIn } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [insightText, setInsightText] = useState("");

  if (!product) {
    return <div className="p-4 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const currentPrice = product.discountPrice || product.price;

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      {/* Back button for mobile/desktop (can also be inside header) */}
      <div className="container mx-auto px-4 py-4">
        <Link href={`/merchant/${product.merchantId}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Back to Store
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: IMAGES & MERCHANT INFO */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-muted rounded-3xl overflow-hidden aspect-square relative shadow-sm border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Merchant Info Card */}
            <div className="border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">{product.merchantName || "Local Store"}</h3>
                  <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold flex items-center ml-2">
                    <Star className="h-3 w-3 fill-primary mr-1" />
                    {product.rating?.toFixed(1) || "4.5"}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-sm gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Local Area
                </div>
                <Link href={`/merchant/${product.merchantId}`}>
                  <Button variant="outline" size="sm" className="rounded-full">View More</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS & ACTIONS */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Badge */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {product.isTrending ? "Trending" : "Popular"}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
              
              {/* Reviews Summary */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center text-orange-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="font-semibold">[{product.rating?.toFixed(1) || "4.5"}]</span>
                <span className="text-primary font-medium">{product.reviewCount || 120} reviews</span>
                <span className="text-muted-foreground">95% Positive</span>
              </div>

              {/* Price */}
              <div className="text-4xl lg:text-5xl font-bold text-primary pt-2 pb-4">
                ${currentPrice.toFixed(2)}
              </div>

              {/* Customizations (Mapped to "Colors" in design) */}
              {product.customizations && product.customizations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.customizations.map((c) => (
                      <Button 
                        key={c} 
                        variant={selectedCustomization === c ? "default" : "outline"} 
                        className="rounded-xl px-5"
                        onClick={() => setSelectedCustomization(c)}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Tags (Mapped to "Sizes" in design) */}
              {product.dietaryTags && product.dietaryTags.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Dietary Preferences</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.dietaryTags.map((tag) => (
                      <Button 
                        key={tag} 
                        variant={selectedTag === tag ? "default" : "outline"} 
                        size="sm"
                        className="rounded-lg"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Description:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                {product.description && <li>{product.description}</li>}
                {product.ingredients && product.ingredients.length > 0 && (
                  <li>Ingredients: {product.ingredients.join(", ")}</li>
                )}
                {product.nutritionalInfo && <li>Nutritional Info: {product.nutritionalInfo}</li>}
              </ul>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Delivery Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 border rounded-xl p-4">
                  <div className="bg-muted p-2 rounded-full">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Delivery</p>
                    <p className="text-sm font-medium">Available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border rounded-xl p-4">
                  <div className="bg-muted p-2 rounded-full">
                    <Store className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Preparation Time</p>
                    <p className="text-sm font-medium">{product.preparationTime || 20} mins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Add to Cart (Hidden on mobile where floating bar takes over) */}
            <div className="hidden md:flex items-center gap-6 pt-6 border-t border-border">
              <div className="flex items-center bg-secondary rounded-full p-1 border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full hover:bg-background"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full hover:bg-background"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  className="w-full h-14 rounded-full font-bold text-lg shadow-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart • ${(currentPrice * quantity).toFixed(2)}
                </Button>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-16 space-y-4">
          <h3 className="font-bold text-xl">My Insights</h3>
          <p className="text-muted-foreground text-sm">Share your personal insights or notes about this product.</p>
          <div className="max-w-2xl space-y-3">
            <textarea
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              placeholder="Write your insights here..."
              value={insightText}
              onChange={(e) => setInsightText(e.target.value)}
            />
            <Button 
              className="rounded-full px-8"
              onClick={() => {
                if (!isSignedIn) {
                  setShowAuthModal(true);
                  return;
                }
                toast({ title: "Insight saved", description: "Your insight has been saved locally." });
                setInsightText("");
              }}
            >
              Save Insight
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Add to Cart for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center bg-secondary rounded-full p-1 border">
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
              className="w-full h-12 rounded-full font-bold shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add • ${(currentPrice * quantity).toFixed(2)}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAuthModal(false)}>
          <div className="bg-background p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold">Sign In Required</h3>
            <p className="text-muted-foreground text-sm">You need to sign in or create an account to add items to your cart or save insights.</p>
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/auth/sign-in" className="w-full" onClick={() => setShowAuthModal(false)}>
                <Button className="w-full rounded-full">Sign In</Button>
              </Link>
              <Link href="/auth/sign-up" className="w-full" onClick={() => setShowAuthModal(false)}>
                <Button variant="outline" className="w-full rounded-full">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
