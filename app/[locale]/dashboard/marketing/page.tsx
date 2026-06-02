import { getPromotions } from "@/lib/server-api";
import CardsContainer from "@/shared/components/pages/dashboard/CardsContainer";
import FeedPromotionHero from "@/shared/components/pages/dashboard/FeedPromotionHero";
import MarketingActionHeader from "@/shared/components/pages/dashboard/MarketingActionHeader";

export default async function DashboardMarketingPage() {
  const data = await getPromotions();
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <MarketingActionHeader />
      <FeedPromotionHero />
      <CardsContainer promotions={data} />
    </div>
  );
}
