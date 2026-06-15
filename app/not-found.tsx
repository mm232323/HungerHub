"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = useTranslations("NotFound");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // typed as any to satisfy framer-motion's Variants typing in this context
  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center">
          {/* Animated Chef Hat Icon */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative w-24 h-24 mb-6">
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <ChefHat className="w-24 h-24 text-primary relative z-10" />
            </div>
          </motion.div>

          {/* 404 Text */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="text-7xl md:text-8xl font-bold text-primary mb-2">404</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
          </motion.div>

          {/* Main Message */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("title") || "Oops! Page Not Found"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {t("description") || "It looks like the kitchen is closed for this page. Let's get you back to finding delicious food!"}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-8 mb-8 justify-center w-full"
          >
            <Link href={`/`} className="flex-1 sm:flex-none">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 rounded-lg px-8"
              >
                <Home className="w-5 h-5" />
                {t("backToHome") || "Back to Home"}
              </Button>
            </Link>

            <Link href={`/discover`} className="flex-1 sm:flex-none">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary/20 hover:bg-primary/5 font-semibold gap-2 rounded-lg px-8"
              >
                <Search className="w-5 h-5" />
                {t("discoverRestaurants") || "Discover Restaurants"}
              </Button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="mt-12 pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6 font-medium">{t("quickNavigation") || "Quick Navigation"}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
              <Link href={`/`}>
                <button className="w-full p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors duration-200 text-sm font-medium text-foreground">
                  <ShoppingBag className="w-5 h-5 mx-auto mb-2" />
                  {t("orderNow") || "Order Now"}
                </button>
              </Link>
              <Link href={`/discover`}>
                <button className="w-full p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors duration-200 text-sm font-medium text-foreground">
                  <Search className="w-5 h-5 mx-auto mb-2" />
                  {t("browse") || "Browse"}
                </button>
              </Link>
              <Link href={`/cart`}>
                <button className="w-full p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors duration-200 text-sm font-medium text-foreground">
                  <ShoppingBag className="w-5 h-5 mx-auto mb-2" />
                  {t("cart") || "Cart"}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
