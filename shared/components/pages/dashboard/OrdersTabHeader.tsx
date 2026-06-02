'use client'
import { Button } from "../../ui/button";
import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

function OrdersTabHeader({
  refreshing,
  totalActive,
  isLoading,
  refresh,
  onToggleRefresh,
}: {
  refreshing: boolean;
  totalActive: number;
  isLoading: boolean;
  refresh: () => void;
  onToggleRefresh: (refreshing: boolean) => void;
}) {
  const t = useTranslations("Dashboard.Orders");

  const handleRefresh = async () => {
    onToggleRefresh(true);
    await refresh();
    onToggleRefresh(false);
  };

  return (
    <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
            {isLoading
              ? t("loading")
              : `${totalActive} ${totalActive === 1 ? t("subtitleActive") : t("subtitleActivePlural")} ${t("subtitlePipeline")}`}
          </p>
        </div>
        {totalActive > 0 && (
          <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
            <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
            {totalActive} {t("active")}
          </span>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        className="gap-2 text-stone-500 border-stone-200 hover:text-stone-900 text-xs sm:text-sm"
      >
        <RefreshCw
          className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
        />
        {t("refresh")}
      </Button>
    </div>
  );
}

export default OrdersTabHeader;
