"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFollowMerchant } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, ChevronLeft, Search, Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Merchant, Product, Review } from "@/types";

export type MerchantProfileViewProps = {
  merchantId: number;
  initialMerchant: Merchant | null;
  initialProducts: Product[];
  initialReviews: Review[];
};

export function MerchantProfileView({
  merchantId,
  initialMerchant,
  initialProducts,
  initialReviews,
}: MerchantProfileViewProps) {
  const { toast } = useToast();
  const [merchant, setMerchant] = useState(initialMerchant);

  useEffect(() => {
    setMerchant(initialMerchant);
  }, [initialMerchant]);

  const followMutation = useFollowMerchant({
    mutation: {
      onSuccess: (data) => {
        toast({ title: "Follow updated" });
        setMerchant((prev) =>
          prev
            ? {
                ...prev,
                isFollowing: data.isFollowing,
                followersCount: data.followersCount,
              }
            : prev,
        );
      },
    },
  });

  if (!merchant) {
    return <div className="p-4 text-center">Merchant not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-64 md:h-80">
        <img
          src={merchant.coverImage}
          alt={merchant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <Link href="/discover">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full backdrop-blur-md"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full backdrop-blur-md"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative -mt-16">
        <div className="bg-card border rounded-3xl p-6 shadow-xl relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-card -mt-16 md:mt-0 bg-muted">
              <AvatarImage src={merchant.profileImage} />
              <AvatarFallback>{merchant.name.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{merchant.name}</h1>
                <Button
                  variant={merchant.isFollowing ? "secondary" : "default"}
                  className="rounded-full"
                  onClick={() => followMutation.mutate({ id: merchantId })}
                >
                  {merchant.isFollowing ? (
                    <>
                      <Check className="h-4 w-4 mr-1" /> Following
                    </>
                  ) : (
                    "Follow"
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {merchant.cuisineType} • {merchant.followersCount} followers
              </p>

              <div className="flex flex-wrap gap-4 text-sm font-medium pt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span>{merchant.rating?.toFixed(1) || "New"}</span>
                  <span className="text-muted-foreground">
                    ({merchant.reviewCount})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{merchant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{merchant.address || "Local Delivery"}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-card-foreground/80">{merchant.bio}</p>
        </div>

        <Tabs defaultValue="products" className="mt-8">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="products"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3"
            >
              Menu
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3"
            >
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="flex gap-4 p-4 rounded-2xl border bg-card hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                      <div className="font-medium">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-1 right-1 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6 space-y-6">
            {initialReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {review.reviewerName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{review.reviewerName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-sm font-medium">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="about" className="py-6">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Address</span>
                <span className="font-medium">
                  {merchant.address || "Online Only"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">${merchant.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Tags</span>
                <div className="flex gap-2">
                  {merchant.tags?.map((tag) => (
                    <span key={tag} className="bg-secondary px-2 py-1 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
