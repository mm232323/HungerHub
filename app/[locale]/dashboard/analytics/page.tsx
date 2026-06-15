import AnalysisCards from "@/shared/components/pages/dashboard/AnalysisCards";
import AnalysisCharts from "@/shared/components/pages/dashboard/AnalysisCharts";
import { getTranslations } from "next-intl/server";

export default async function DashboardAnalyticsPage() {
  const t = await getTranslations("Dashboard.Analytics");
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>
      <AnalysisCards />

      <AnalysisCharts />
    </div>
  );
}
