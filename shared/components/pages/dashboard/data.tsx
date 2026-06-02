"use client";
import { Bell, Bike, CheckCircle2, ChefHat, PackageCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { JSX } from "react";

export type stageType =
  | {
      id: string;
      label: string;
      dot: string;
      ring: string;
      header: string;
      label_color: string;
      badge_bg: string;
      action: {
        label: string;
        next: string;
        variant: "default";
      };
      icon: JSX.Element;
    }
  | {
      id: string;
      label: string;
      dot: string;
      ring: string;
      header: string;
      label_color: string;
      badge_bg: string;
      action: {
        label: string;
        next: string;
        variant: "outline";
      };
      icon: JSX.Element;
    };

export function useOrderStages(): stageType[] {
  const t = useTranslations("Dashboard.Orders");

  return [
    {
      id: "pending",
      label: t("stageNew"),
      dot: "bg-orange-400",
      ring: "ring-orange-200",
      header: "bg-orange-50 border-orange-100",
      label_color: "text-orange-700",
      badge_bg: "bg-orange-100 text-orange-700",
      action: {
        label: t("actionAccept"),
        next: "confirmed",
        variant: "default" as const,
      },
      icon: <Bell className="h-3.5 w-3.5" />,
    },
    {
      id: "confirmed",
      label: t("stageConfirmed"),
      dot: "bg-blue-400",
      ring: "ring-blue-200",
      header: "bg-blue-50 border-blue-100",
      label_color: "text-blue-700",
      badge_bg: "bg-blue-100 text-blue-700",
      action: {
        label: t("actionSendToKitchen"),
        next: "preparing",
        variant: "default" as const,
      },
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },
    {
      id: "preparing",
      label: t("stageKitchen"),
      dot: "bg-purple-400",
      ring: "ring-purple-200",
      header: "bg-purple-50 border-purple-100",
      label_color: "text-purple-700",
      badge_bg: "bg-purple-100 text-purple-700",
      action: {
        label: t("actionMarkReady"),
        next: "ready",
        variant: "default" as const,
      },
      icon: <ChefHat className="h-3.5 w-3.5" />,
    },
    {
      id: "ready",
      label: t("stageReady"),
      dot: "bg-emerald-400",
      ring: "ring-emerald-200",
      header: "bg-emerald-50 border-emerald-100",
      label_color: "text-emerald-700",
      badge_bg: "bg-emerald-100 text-emerald-700",
      action: {
        label: t("actionHandOff"),
        next: "delivering",
        variant: "default" as const,
      },
      icon: <PackageCheck className="h-3.5 w-3.5" />,
    },
    {
      id: "delivering",
      label: t("stageDelivering"),
      dot: "bg-indigo-400",
      ring: "ring-indigo-200",
      header: "bg-indigo-50 border-indigo-100",
      label_color: "text-indigo-700",
      badge_bg: "bg-indigo-100 text-indigo-700",
      action: {
        label: t("actionComplete"),
        next: "delivered",
        variant: "outline" as const,
      },
      icon: <Bike className="h-3.5 w-3.5" />,
    },
  ];
}
