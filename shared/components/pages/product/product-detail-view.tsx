"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, Review } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, Minus, Plus, ShoppingBag, Star, MapPin, Truck, Store, 
  Maximize, Clock, ShieldCheck, Award, Leaf, Sparkles, CheckCircle2, Flame, UserCircle2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/shared/contexts/CartContext";
import { useUser } from "@clerk/react";
import { submitReview } from "@/lib/client-api";
import { useTranslations } from "next-intl";

export type ProductDetailViewProps = {
  product: Product | null;
  initialReviews?: Review[];
};

export function ProductDetailView({ product, initialReviews = [] }: ProductDetailViewProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomization, setSelectedCustomization] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { isSignedIn, user } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const t = useTranslations("ProductDetail");

  if (!product) {
    return <div className="p-4 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: t("addedToCartTitle"),
      description: t("addedToCartDesc", { quantity, name: product.name }),
    });
  };

  const currentPrice = product.discountPrice || product.price;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32 md:pb-12 text-foreground font-sans">
      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        
        {/* Top Back Button */}
        <div>
          <Link href={`/merchant/${product.merchantSlug || product.merchantId}`}>
            <Button variant="ghost" size="sm" className="gap-2 px-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" /> {t("backToStore")}
            </Button>
          </Link>
        </div>

        {/* Section 1: Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Image */}
          <div className="relative bg-muted rounded-[32px] overflow-hidden aspect-square shadow-sm sticky top-24">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black rounded-full gap-2 shadow-md"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize className="h-4 w-4" /> {t("viewFullscreen")}
            </Button>
          </div>

          {/* Right Column: Product Details Card */}
          <div className="bg-white border rounded-[32px] p-6 lg:p-8 shadow-sm space-y-6">
            
            {/* Header: Badge & Title */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-md text-xs font-bold uppercase tracking-wider border border-orange-100">
                <Flame className="h-3.5 w-3.5" />
                {product.isTrending ? t("trending") : t("popular")}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
              
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="flex items-center text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${(product.rating || 0) >= star ? "fill-current" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="text-foreground text-base ml-1">{product.rating ? product.rating.toFixed(1) : t("new")}</span>
                <span className="text-orange-500 text-base">({product.reviewCount || 0} {t("reviews")})</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-4xl lg:text-5xl font-bold text-orange-500">
              ${currentPrice.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
              {product.description || t("defaultDescription")}
            </p>

            {/* Features Row */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5">
                <Award className="h-5 w-5 text-orange-500" /> {t("premiumQuality")}
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="h-5 w-5 text-green-500" /> {t("freshlyPrepared")}
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-yellow-500" /> {t("perfectlySeasoned")}
              </div>
            </div>
            
            <hr className="border-muted" />

            {/* Delivery Info */}
            <div className="space-y-3">
              <h3 className="font-bold text-foreground">{t("deliveryInfo")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border rounded-2xl p-4 bg-white shadow-sm">
                  <Truck className="h-6 w-6 text-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium">{t("delivery")}</p>
                    <p className="text-sm font-bold text-foreground">{t("available")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border rounded-2xl p-4 bg-white shadow-sm">
                  <Clock className="h-6 w-6 text-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium">{t("preparationTime")}</p>
                    <p className="text-sm font-bold text-foreground">{product.preparationTime || 20} {t("mins")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Options & Tags (if any) */}
            {(product.customizations?.length || product.dietaryTags?.length) ? (
              <div className="space-y-4">
                {product.customizations && product.customizations.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm">{t("options")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.customizations.map((c) => (
                        <Button 
                          key={c} 
                          variant={selectedCustomization === c ? "default" : "outline"} 
                          size="sm"
                          className="rounded-xl"
                          onClick={() => setSelectedCustomization(c)}
                        >
                          {c}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Add to Cart Section */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-foreground">{t("quantity")}</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center justify-between border rounded-2xl p-1 bg-white shadow-sm w-full sm:w-32">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-xl text-foreground"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-xl text-foreground"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  className="flex-1 h-14 rounded-2xl font-bold text-lg bg-orange-500 hover:bg-orange-600 shadow-md transition-all text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {t("addToCart")} • ${(currentPrice * quantity).toFixed(2)}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground pt-2">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                {t("secureCheckout")}
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Merchant Card */}
          <div className="bg-white border rounded-3xl p-6 lg:p-8 shadow-sm flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-sm border-4 border-orange-50">
                <Store className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground flex items-center gap-3">
                  {product.merchantName || t("localStore")}
                  <span className="flex items-center text-orange-500 bg-orange-50 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-current mr-1" />
                    4.5
                  </span>
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1 font-medium">
                  <MapPin className="h-4 w-4" />
                  {t("localArea")}
                </div>
              </div>
            </div>
            <Link href={`/merchant/${product.merchantSlug || product.merchantId}`}>
              <Button variant="outline" className="rounded-xl font-bold px-6 h-10 border-border">{t("viewMore")}</Button>
            </Link>
          </div>

          {/* Why choose us Card */}
          <div className="bg-[#fff9f2] border-0 rounded-3xl p-6 lg:p-8 shadow-sm space-y-5 h-full flex flex-col justify-center">
            <h3 className="font-bold text-lg flex items-center gap-2 text-foreground">
              <Store className="h-5 w-5 text-orange-500" /> {t("whyChooseUs")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
                {t("freshIngredients")}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
                {t("hygienicallyPrepared")}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
                {t("deliveredWithCare")}
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Reviews Card */}
        <div className="bg-white border rounded-3xl p-6 lg:p-10 shadow-sm space-y-10">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            
            <div className="md:w-1/3 space-y-3">
              <h3 className="font-bold text-2xl tracking-tight">{t("customerReviews")}</h3>
              <p className="text-muted-foreground text-sm font-medium">{t("rateProduct")}</p>
              <div className="flex items-center gap-1 pt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1.5 transition-colors ${rating >= star ? "text-yellow-400" : "text-muted-foreground/30 hover:text-muted-foreground/60"}`}
                  >
                    <Star className={`h-8 w-8 ${rating >= star ? "fill-yellow-400" : ""}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="md:w-2/3 space-y-4">
              <textarea
                className="w-full min-h-[140px] rounded-2xl border border-input bg-background p-5 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 resize-none font-medium"
                placeholder={t("writeReviewPlaceholder")}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button 
                className="rounded-xl px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 shadow-md"
                disabled={isSubmitting || rating === 0}
                onClick={async () => {
                  if (!isSignedIn) {
                    setShowAuthModal(true);
                    return;
                  }
                  setIsSubmitting(true);
                  try {
                    await submitReview({
                      merchantId: product.merchantId,
                      productId: product.id,
                      reviewerName: user?.fullName || "Guest",
                      rating,
                      comment,
                    });
                    toast({ title: t("reviewSubmitted"), description: t("reviewThanks") });
                    setComment("");
                    setRating(0);
                  } catch (error: any) {
                    toast({ title: t("errorTitle"), description: error.message || t("reviewError"), variant: "destructive" });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                {t("submitReview")}
              </Button>
            </div>
          </div>

          {/* Top 3 Reviews Display */}
          {initialReviews.length > 0 && (
            <div className="pt-8 border-t space-y-6">
              <h4 className="font-bold text-xl tracking-tight">{t("recentReviews")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialReviews.map((review) => (
                  <div key={review.id} className="bg-[#f8f9fa] border rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCircle2 className="h-8 w-8 text-muted-foreground/50" />
                        <span className="font-bold text-sm text-foreground">{review.reviewerName}</span>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        "{review.comment}"
                      </p>
                    )}
                    <div className="text-xs font-medium text-muted-foreground pt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Floating Add to Cart for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center bg-white border rounded-xl p-1 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-lg text-foreground"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-lg text-foreground"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
            <Button
              className="w-full h-14 rounded-xl font-bold text-lg shadow-md bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {t("add")} • ${(currentPrice * quantity).toFixed(2)}
            </Button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" 
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white p-8 rounded-3xl max-w-sm w-full space-y-6 shadow-2xl" 
              onClick={e => e.stopPropagation()}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">{t("signInRequired")}</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed">{t("signInMessage")}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/auth/sign-in" className="w-full" onClick={() => setShowAuthModal(false)}>
                  <Button className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-md">{t("signIn")}</Button>
                </Link>
                <Link href="/auth/sign-up" className="w-full" onClick={() => setShowAuthModal(false)}>
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-base border-border">{t("createAccount")}</Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setIsFullscreen(false)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl cursor-default shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full h-12 w-12"
            onClick={() => setIsFullscreen(false)}
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </Button>
        </div>
      )}
    </div>
  );
}
