import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import { Merchant, Product, Review } from "@/types";
function MerchantTabs({
  initialReviews,
  initialProducts,
  merchant,
}: {
  initialReviews: Review[];
  initialProducts: Product[];
  merchant: Merchant;
}) {
  return (
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
                <span className="font-medium text-sm">
                  {review.reviewerName}
                </span>
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
            <span className="font-medium">
              ${merchant.deliveryFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Tags</span>
            <div className="flex gap-2">
              {merchant.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary px-2 py-1 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default MerchantTabs;
