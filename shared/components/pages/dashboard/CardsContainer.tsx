import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Promotion } from "@/types";
import { Skeleton } from "../../alerts/skeleton";
import { Percent, Ticket, Truck, Edit } from "lucide-react";
import { useTranslations } from "next-intl";
import PromotionFormModal from "./PromotionFormModal";

function CardsContainer({
  //   isLoading,
  promotions,
}: {
  //   isLoading: boolean;
  promotions?: Promotion[];
}) {
  const t = useTranslations("Dashboard.Marketing");
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-5 w-5" />;
      case "free_delivery":
        return <Truck className="h-5 w-5" />;
      default:
        return <Ticket className="h-5 w-5" />;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {promotions?.map((promo) => (
          <Card
            key={promo.id}
            className={`group relative ${
              promo.isActive ? "border-primary/50 shadow-sm" : "opacity-60"
            }`}
          >
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{promo.title}</CardTitle>
                <CardDescription className="mt-1">
                  {promo.code ? (
                    <code className="bg-muted px-2 py-0.5 rounded text-primary font-bold">
                      {promo.code}
                    </code>
                  ) : (
                    t("autoApplied")
                  )}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setEditingPromo(promo)}
                >
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div
                  className={`p-2 rounded-lg ${promo.isActive ? "bg-primary/10 text-primary" : "bg-muted"}`}
                >
                  {getIcon(promo.type)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t("usage")}</p>
                  <p className="font-bold text-lg">
                    {promo.usageCount || 0} {t("times")}
                  </p>
                </div>
                <Badge variant={promo.isActive ? "default" : "secondary"}>
                  {promo.isActive ? t("statusActive") : t("statusExpired")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <PromotionFormModal
        isOpen={!!editingPromo}
        setIsOpen={(open) => { if (!open) setEditingPromo(null) }}
        promotionToEdit={editingPromo}
      />
    </>
  );
}

export default CardsContainer;
