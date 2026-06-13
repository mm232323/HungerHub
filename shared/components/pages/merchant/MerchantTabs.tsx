import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Plus, Star, Menu, Info, Phone, Mail, Globe, Facebook, Instagram, Twitter, Youtube, Clock } from "lucide-react";
import Link from "next/link";
import { Merchant, Product, Review } from "@/types";
import { useTranslations } from "next-intl";

function MerchantTabs({
  initialReviews,
  initialProducts,
  merchant,
}: {
  initialReviews: Review[];
  initialProducts: Product[];
  merchant: Merchant;
}) {
  const t = useTranslations("MerchantTabs");
  const showedFields = merchant.additionalShowed ? merchant.additionalShowed.split(',') : [];

  return (
    <Tabs defaultValue="products" className="mt-12 mb-20">
      <TabsList className="w-full flex p-1.5 bg-stone-100 rounded-2xl gap-2 mb-8 h-auto overflow-x-auto scrollbar-hide">
        <TabsTrigger
          value="products"
          className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:text-orange-500 data-[state=active]:shadow-sm py-3 font-bold text-stone-500 transition-all gap-2"
        >
          <Menu className="w-4 h-4" />
          {t("menu")}
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:text-orange-500 data-[state=active]:shadow-sm py-3 font-bold text-stone-500 transition-all gap-2"
        >
          <Star className="w-4 h-4" />
          {t("reviews")}
        </TabsTrigger>
        <TabsTrigger
          value="about"
          className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:text-orange-500 data-[state=active]:shadow-sm py-3 font-bold text-stone-500 transition-all gap-2"
        >
          <Info className="w-4 h-4" />
          {t("about") || "About"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="products" className="animate-in fade-in-50 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="flex gap-4 p-4 rounded-3xl border border-stone-100 bg-white hover:border-orange-200 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex-1 space-y-2 py-1">
                  <h3 className="font-bold text-stone-800 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="font-black text-lg text-stone-900 pt-1">${product.price.toFixed(2)}</div>
                </div>
                <div className="relative h-28 w-28 shrink-0 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-orange-500 hover:bg-orange-500 hover:text-white shadow-md"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="space-y-4 animate-in fade-in-50 duration-500">
        <div className="bg-white border border-stone-100 rounded-3xl p-6 lg:p-8 shadow-sm">
          {initialReviews.length === 0 ? (
            <p className="text-center text-stone-500 py-8">No reviews yet.</p>
          ) : (
            <div className="space-y-6">
              {initialReviews.map((review) => (
                <div key={review.id} className="border-b border-stone-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-stone-100">
                        <AvatarFallback className="bg-orange-50 text-orange-600 font-bold">
                          {review.reviewerName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-stone-800">
                        {review.reviewerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-700">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed pl-13">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="about" className="animate-in fade-in-50 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Details */}
          <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-stone-800 mb-4">Restaurant Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-500 font-medium">{t("address") || "Address"}</span>
                <span className="font-bold text-right max-w-[200px] truncate text-stone-800">{merchant.address || "Online Only"}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-500 font-medium">{t("deliveryFee") || "Delivery Fee"}</span>
                <span className="font-bold text-stone-800">${merchant.deliveryFee?.toFixed(2) || "0.00"}</span>
              </div>
              {merchant.tags && merchant.tags.length > 0 && (
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-stone-500 font-medium block mb-2">{t("tags") || "Tags"}</span>
                  <div className="flex flex-wrap gap-2">
                    {merchant.tags.map((tag) => (
                      <span key={tag} className="bg-white border border-stone-200 px-3 py-1 rounded-lg text-xs font-bold text-orange-500 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-stone-800 mb-4">Contact & Connect</h3>
            {showedFields.length === 0 ? (
              <p className="text-stone-400 italic text-sm p-4 bg-stone-50 rounded-xl border border-stone-100 text-center">No additional contact info provided.</p>
            ) : (
              <div className="space-y-3">
                {showedFields.includes("phone") && merchant.phone && (
                  <div className="flex items-center gap-3 p-3 bg-stone-50 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-orange-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-stone-400 group-hover:text-orange-500 transition-colors"><Phone className="w-4 h-4" /></div>
                    <span className="font-bold text-stone-800">{merchant.phone}</span>
                  </div>
                )}
                {showedFields.includes("email") && merchant.email && (
                  <div className="flex items-center gap-3 p-3 bg-stone-50 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-orange-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-stone-400 group-hover:text-orange-500 transition-colors"><Mail className="w-4 h-4" /></div>
                    <span className="font-bold text-stone-800">{merchant.email}</span>
                  </div>
                )}
                {showedFields.includes("website") && merchant.website && (
                  <div className="flex items-center gap-3 p-3 bg-stone-50 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-orange-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-stone-400 group-hover:text-orange-500 transition-colors"><Globe className="w-4 h-4" /></div>
                    <span className="font-bold text-stone-800">{merchant.website}</span>
                  </div>
                )}
                {showedFields.includes("openingHours") && merchant.openingHours && (
                  <div className="flex items-center gap-3 p-3 bg-stone-50 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-orange-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-stone-400 group-hover:text-orange-500 transition-colors"><Clock className="w-4 h-4" /></div>
                    <span className="font-bold text-stone-800">{merchant.openingHours}</span>
                  </div>
                )}
                
                {/* Socials row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {showedFields.includes("facebook") && merchant.facebook && (
                    <a href={`https://${merchant.facebook}`} target="_blank" rel="noreferrer" className="bg-stone-50 hover:bg-[#1877F2]/10 hover:text-[#1877F2] text-stone-400 p-3 rounded-xl transition-colors border border-stone-100 hover:border-[#1877F2]/20">
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {showedFields.includes("instagram") && merchant.instagram && (
                    <a href={`https://${merchant.instagram}`} target="_blank" rel="noreferrer" className="bg-stone-50 hover:bg-[#E4405F]/10 hover:text-[#E4405F] text-stone-400 p-3 rounded-xl transition-colors border border-stone-100 hover:border-[#E4405F]/20">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {showedFields.includes("twitter") && merchant.twitter && (
                    <a href={`https://${merchant.twitter}`} target="_blank" rel="noreferrer" className="bg-stone-50 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] text-stone-400 p-3 rounded-xl transition-colors border border-stone-100 hover:border-[#1DA1F2]/20">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {showedFields.includes("youtube") && merchant.youtube && (
                    <a href={`https://${merchant.youtube}`} target="_blank" rel="noreferrer" className="bg-stone-50 hover:bg-[#FF0000]/10 hover:text-[#FF0000] text-stone-400 p-3 rounded-xl transition-colors border border-stone-100 hover:border-[#FF0000]/20">
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default MerchantTabs;
