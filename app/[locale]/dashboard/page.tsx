import RevenueCharts from "@/shared/components/pages/dashboard/RevenueCharts";
import StatsGrid from "@/shared/components/pages/dashboard/StatsGrid";
import { getTranslations } from "next-intl/server";

export default async function DashboardHomePage() {
  const t = await getTranslations("Dashboard.Home");
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>
      <StatsGrid />
      <RevenueCharts />
    </div>
  );
}
