import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ShoppingBag, LayoutDashboard, Utensils } from "lucide-react";
import { useTranslations } from "next-intl";

export function BottomNav() {
  const t = useTranslations("BottomNav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDiscover = pathname === "/discover";
  const isMeals = pathname === "/meals";
  const isCart = pathname === "/cart";
  const dashActive = pathname?.startsWith("/dashboard");

  const items = [
    { href: "/", label: t("home"), icon: Home, active: isHome },
    { href: "/discover", label: t("discover"), icon: Compass, active: isDiscover },
    { href: "/meals", label: t("meals"), icon: Utensils, active: isMeals },
    { href: "/cart", label: t("cart"), icon: ShoppingBag, active: isCart },
    { href: "/dashboard", label: t("dashboard"), icon: LayoutDashboard, active: dashActive },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ href, label, icon: Icon, active }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${active ? "bg-primary/10" : ""}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
