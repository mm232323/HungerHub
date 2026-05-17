import { Link, useRoute } from "wouter";
import { Home, Compass, ShoppingBag, LayoutDashboard } from "lucide-react";

export function BottomNav() {
  const [isHome] = useRoute("/");
  const [isDiscover] = useRoute("/discover");
  const [isCart] = useRoute("/cart");
  const [isDashboard] = useRoute("/dashboard/:rest*");
  const [isDashboardHome] = useRoute("/dashboard");
  const dashActive = isDashboard || isDashboardHome;

  const items = [
    { href: "/", label: "Home", icon: Home, active: isHome },
    { href: "/discover", label: "Discover", icon: Compass, active: isDiscover },
    { href: "/cart", label: "Cart", icon: ShoppingBag, active: isCart },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: dashActive },
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
