"use client";
import { useGetDashboardProducts, useListCategories } from "@/apis";
import ProductActionHeader from "@/shared/components/pages/dashboard/ProductActionHeader";
import ProductTabBody from "@/shared/components/pages/dashboard/ProductTabBody";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Search } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

export default function DashboardProductsPage() {
  const t = useTranslations("Dashboard.Products");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: products, refetch } = useGetDashboardProducts({
    query: { queryKey: ["/dashboard/products"] },
  });
  
  const { data: categories } = useListCategories({
    query: { queryKey: ["/categories"] }
  });

  const filteredProducts =
    products?.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesStatus = statusFilter === "all" 
        || (statusFilter === "active" && p.isAvailable)
        || (statusFilter === "hidden" && !p.isAvailable);
      return matchesSearch && matchesCategory && matchesStatus;
    }) || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <ProductActionHeader onSuccess={refetch} />

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-3 rounded-xl border border-stone-100 shadow-sm">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-9 bg-stone-50/50 border-stone-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[160px] bg-stone-50/50">
              <SelectValue placeholder={t("categoryLabel") || "Category"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allCategories") || "All Categories"}</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>{locale === 'ar' ? (cat.name_ar || cat.name) : cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[130px] bg-stone-50/50">
              <SelectValue placeholder={t("status") || "Status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allStatuses") || "All Statuses"}</SelectItem>
              <SelectItem value="active">{t("statusActive") || "Active"}</SelectItem>
              <SelectItem value="hidden">{t("statusHidden") || "Hidden"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-stone-500 font-medium ml-auto hidden md:block">
          {filteredProducts.length} {t("items")}
        </div>
      </div>

      <ProductTabBody filteredProducts={filteredProducts} onUpdated={refetch} />
    </div>
  );
}
