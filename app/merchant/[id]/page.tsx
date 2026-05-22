import type { Metadata } from "next";
import { MerchantProfileView } from "@/shared/components/pages/merchant/merchant-profile-view";
import {
  getMerchantById,
  getMerchantProducts,
  getMerchantReviews,
} from "@/lib/server-api";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const merchant = await getMerchantById(parseInt(id, 10));
  return {
    title: merchant
      ? `${merchant.name} - HungerHub`
      : "Merchant Store Profile - HungerHub",
    description:
      "Explore merchant details, delicious menus, ratings and review history.",
  };
}

export default async function MerchantPage({ params }: Props) {
  const { id } = await params;
  const merchantId = parseInt(id, 10);

  const [initialMerchant, initialProducts, initialReviews] = await Promise.all([
    getMerchantById(merchantId),
    getMerchantProducts(merchantId),
    getMerchantReviews(merchantId),
  ]);

  return (
    <MerchantProfileView
      merchantId={merchantId}
      initialMerchant={initialMerchant}
      initialProducts={initialProducts}
      initialReviews={initialReviews}
    />
  );
}
