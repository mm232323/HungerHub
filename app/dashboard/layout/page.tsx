import { Link, useRoute } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import {
  LayoutDashboard, Package, Megaphone, BarChart3,
  Home, Compass, ShoppingCart, LogOut, User,
  ClipboardList, Utensils, ExternalLink, ChevronRight,
} from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function NavItem({
  href, icon: Icon, label, exact = false, badge,
}: {
  href: string; icon: React.ElementType; label: string; exact?: boolean; badge?: number;
}) {
  const [exactMatch] = useRoute(href);
  const [prefixMatch] = useRoute(href + "/:rest*");
  const active = exact ? exactMatch : (exactMatch || prefixMatch);

  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer group ${
        active
          ? "bg-orange-500/15 text-orange-400"
          : "text-white/45 hover:text-white/90 hover:bg-white/[0.06]"
      }`}>
        <Icon className={`h-[18px] w-[18px] shrink-0 transition-colors ${active ? "text-orange-400" : "group-hover:text-white/80"}`} />
        <span className={`text-sm flex-1 ${active ? "font-semibold text-orange-300" : "font-medium"}`}>{label}</span>
        {badge != null && badge > 0 && (
          <span className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">
            {badge}
          </span>
        )}
        {active && !badge && (
          <span className="h-1.5 w-1.5 bg-orange-400 rounded-full" />
        )}
      </div>
    </Link>
  );
}

function ConsumerNavItem({ href, icon: Icon, label }: {
  href: string; icon: React.ElementType; label: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/65 hover:bg-white/[0.05] transition-all duration-150 cursor-pointer group">
        <Icon className="h-[17px] w-[17px] shrink-0 group-hover:text-white/60 transition-colors" />
        <span className="text-sm font-medium flex-1">{label}</span>
        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>
    </Link>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="flex h-screen overflow-hidden w-full">

      {/* ── Sidebar ── */}
      <aside className="w-[240px] shrink-0 flex flex-col h-full"
        style={{ background: "linear-gradient(180deg,#111110 0%,#0d0d0c 100%)" }}>

        {/* Brand */}
        <div className="px-5 pt-5 pb-4 border-b border-white/[0.07]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-orange-500 p-[7px] rounded-[10px] shadow-lg shadow-orange-500/25">
              <Utensils className="h-[15px] w-[15px] text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">FoodHub</span>
          </Link>
          <div className="flex items-center gap-1.5 mt-2 ml-[3px]">
            <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[11px] text-white/30 font-medium tracking-wide">Merchant Dashboard</span>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-4 min-h-0">

          {/* Restaurant section */}
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 px-3 mb-2">
            My Restaurant
          </p>
          <nav className="space-y-0.5 mb-5">
            <NavItem href="/dashboard"          icon={LayoutDashboard} label="Overview"   exact />
            <NavItem href="/dashboard/orders"   icon={ClipboardList}   label="Orders" />
            <NavItem href="/dashboard/products" icon={Package}         label="Products" />
            <NavItem href="/dashboard/marketing"icon={Megaphone}       label="Marketing" />
            <NavItem href="/dashboard/analytics"icon={BarChart3}       label="Analytics" />
          </nav>

          {/* Divider */}
          <div className="border-t border-white/[0.07] mx-1 mb-5" />

          {/* Consumer section */}
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 px-3 mb-2">
            Browse FoodHub
          </p>
          <nav className="space-y-0.5">
            <ConsumerNavItem href="/"         icon={Home}         label="Home" />
            <ConsumerNavItem href="/discover" icon={Compass}      label="Discover Food" />
            <ConsumerNavItem href="/cart"     icon={ShoppingCart} label="My Cart" />
          </nav>
        </div>

        {/* User profile */}
        <div className="border-t border-white/[0.07] p-3">
          {user ? (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group cursor-default">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt={user.firstName ?? ""}
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10 shrink-0" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5 text-white/50" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white/80 truncate leading-tight">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[11px] text-white/30 truncate leading-tight mt-0.5">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              <button
                onClick={() => signOut({ redirectUrl: `${window.location.origin}${basePath}/` })}
                className="shrink-0 p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                title="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link href="/sign-in">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors text-sm">
                <User className="h-4 w-4" /> Sign in
              </div>
            </Link>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto bg-stone-50 min-w-0">
        {children}
      </main>
    </div>
  );
}
