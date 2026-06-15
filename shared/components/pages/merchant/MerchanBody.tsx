"use client";
import { useTranslations } from "next-intl";

import React, { useEffect, useState } from "react";
import { Merchant, Product, Review } from "@/types";
import { toast } from "@/hooks/use-toast";
import MerchantInfo from "./MerchantInfo";
import MerchantTabs from "./MerchantTabs";

function MerchanBody({
  initialMerchant,
  initialReviews,
  initialProducts,
  merchantId,
}: {
  initialMerchant: Merchant;
  initialProducts: Product[];
  initialReviews: Review[];
  merchantId: number;
}) {
  const toastT = useTranslations("Toasts");
  const [merchant, setMerchant] = useState(initialMerchant);
  const handleUpdateFollows = (
    isFollowing: boolean,
    followersCount: number,
  ) => {
    toast({ title: toastT("followUpdated") });
    setMerchant((prev) =>
      prev
        ? {
            ...prev,
            isFollowing,
            followersCount,
          }
        : prev,
    );
  };
  useEffect(() => {
    setMerchant(initialMerchant);
  }, [initialMerchant]);

  return (
    <div className="container max-w-4xl mx-auto px-4 relative -mt-16">
      <MerchantInfo
        merchant={merchant}
        merchantId={merchantId}
        onHandleFollows={handleUpdateFollows}
      />
      <MerchantTabs
        initialProducts={initialProducts}
        initialReviews={initialReviews}
        merchant={merchant}
      />
    </div>
  );
}

export default MerchanBody;
