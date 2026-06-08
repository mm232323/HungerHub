import type { Metadata } from "next";
import {
  getMerchantBySlug,
  getMerchantProducts,
  getMerchantReviews,
} from "@/lib/server-api";
import MerchantHeader from "@/shared/components/pages/merchant/MerchantHeader";
import MerchantBody from "@/shared/components/pages/merchant/MerchanBody";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const merchant = await getMerchantBySlug(slug);
  return {
    title: merchant
      ? `${merchant.name} - HungerHub`
      : "Merchant Store Profile - HungerHub",
    description:
      "Explore merchant details, delicious menus, ratings and review history.",
  };
}

export default async function MerchantPage({ params }: Props) {
  const { slug } = await params;

  const initialMerchant = await getMerchantBySlug(slug);
  
  if (!initialMerchant) {
    return <div className="p-4 text-center">Merchant not found</div>;
  }

  const merchantId = initialMerchant.id;

  const [initialProducts, initialReviews] = await Promise.all([
    getMerchantProducts(merchantId),
    getMerchantReviews(merchantId),
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <MerchantHeader merchant={initialMerchant} />
      <div className="container max-w-4xl mx-auto px-4 relative -mt-16">
        <MerchantBody
          initialMerchant={initialMerchant}
          initialProducts={initialProducts}
          initialReviews={initialReviews}
          merchantId={merchantId}
        />
      </div>
    </div>
  );
}
