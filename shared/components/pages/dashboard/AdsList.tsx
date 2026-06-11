'use client'
import React, { useState } from "react";
import { useGetAds, useDeleteAd } from "@/apis/ads";
import type { Ad } from "@/apis/ads";
import { useTranslations } from "next-intl";
import { Edit2, Trash2, Zap, Image as ImageIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../ui/card";
import AdFormModal from "./AdFormModal";
import MarketingEmptyState from "./MarketingEmptyState";
import { Skeleton } from "../../alerts/skeleton";

export default function AdsList() {
  const t = useTranslations("Dashboard.Marketing");
  const { data: ads, isLoading } = useGetAds();
  const { mutate: deleteAd, isPending: isDeleting } = useDeleteAd();
  
  const [editingAd, setEditingAd] = useState<Ad | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this ad? This action cannot be undone.")) {
      deleteAd(id, {
        onSuccess: () => alert("Ad deleted successfully"),
        onError: (err: any) => alert(err.message),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-72 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!ads || ads.length === 0) {
    return <MarketingEmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <Card key={ad.id} className="overflow-hidden flex flex-col bg-background border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            {/* Image Section */}
            <div className="w-full aspect-video bg-muted relative border-b flex items-center justify-center">
              {ad.img ? (
                <img src={ad.img} alt={ad.title} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              )}
              {/* Status Badge Over Image */}
              <div className="absolute top-3 right-3">
                <Badge variant={ad.isActive !== false ? "default" : "secondary"} className="shadow-sm">
                  {ad.isActive !== false ? (
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Active</span>
                  ) : (
                    "Paused"
                  )}
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <CardHeader className="p-4 pb-2">
              <h3 className="font-bold text-lg line-clamp-1" title={ad.title}>{ad.title}</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2" title={ad.description}>
                {ad.description}
              </p>
              
              {/* Stats Row (if we have stats from backend) */}
              <div className="flex items-center gap-4 mt-4 text-xs font-medium text-muted-foreground">
                <div className="flex flex-col">
                  <span>{t("impressions")}</span>
                  <span className="text-foreground text-sm">{ad.impressions || 0}</span>
                </div>
                <div className="flex flex-col">
                  <span>{t("clicks")}</span>
                  <span className="text-foreground text-sm">{ad.clicks || 0}</span>
                </div>
              </div>
            </CardContent>

            {/* Actions Section */}
            <CardFooter className="p-4 border-t bg-muted/20 flex gap-2 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                onClick={() => handleDelete(ad.id)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Delete
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleEdit(ad)}
              >
                <Edit2 className="h-4 w-4 mr-1.5" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AdFormModal 
        isOpen={isModalOpen} 
        setIsOpen={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingAd(undefined);
        }} 
        adToEdit={editingAd} 
      />
    </>
  );
}
