import Link from "next/link";
import { Utensils, ShoppingBag, LayoutDashboard, Compass, Home, Menu, X, LogOut, User, Package, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser, useClerk, Show } from "@clerk/nextjs";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const basePath = "";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative text-sm font-medium transition-colors hover:text-primary ${active ? "text-primary" : "text-muted-foreground"
        }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary rounded-full" />
      )}
    </Link>
  );
}

function LanguageToggle() {
  const locale = useLocale();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    
    // Use raw browser API to guarantee correct URL and force a hard reload
    const currentPath = window.location.pathname;
    const segments = currentPath.split("/");
    
    if (segments[1] === locale) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    
    const newPath = segments.join("/") + window.location.search + window.location.hash;
    window.location.href = newPath;
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLocale} className="rounded-full font-medium gap-2 text-muted-foreground hover:text-foreground">
      <Globe className="h-4 w-4" />
      {locale === "en" ? "عربي" : "EN"}
    </Button>
  );
}

function UserAvatar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const isRTL = locale === "ar";
  const isMerchant = user?.unsafeMetadata?.role === "merchant";

  const handleSignOut = () => {
    setOpen(false);
    signOut({ redirectUrl: `${window.location.origin}${basePath}/` });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.firstName ?? "User"}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div className={`absolute ${isRTL ? "left-0" : "right-0"} top-11 z-50 bg-background border rounded-xl shadow-lg w-52 py-2 overflow-hidden`}>
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-semibold truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
              {isMerchant && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  <LayoutDashboard className="h-3 w-3" /> {t("badgeMerchant")}
                </span>
              )}
            </div>
            {isMerchant && (
              <button
                onClick={() => { setOpen(false); router.push("/dashboard"); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
              >
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                {t("btnMerchantDashboard")}
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {t("btnSignOut")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  const t = useTranslations("Nav");
  const tGlobal = useTranslations("Global");
  const isMerchant = user?.unsafeMetadata?.role === "merchant";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-primary p-1.5 rounded-xl">
            <Utensils className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">{tGlobal("brand")}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 border-b-0 h-full">
          <NavLink href="/">{t("linkHome")}</NavLink>
          <NavLink href="/discover">{t("linkDiscover")}</NavLink>
          <NavLink href="/meals">{t("linkMeals")}</NavLink>
          <Show when="signed-in">
            <NavLink href="/track">{t("linkOrders")}</NavLink>
          </Show>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <Show when="signed-in">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
              </Button>
            </Link>
          </Show>

          {/* Signed out: Login + Sign up */}
          <Show when="signed-out">
            <Link href="/auth/sign-in">
              <Button variant="ghost" size="sm" className="rounded-full font-medium">
                {t("btnSignIn")}
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="rounded-full font-semibold">
                {t("btnSignUp")}
              </Button>
            </Link>
          </Show>

          {/* Signed in: merchant dashboard or user avatar */}
          <Show when="signed-in">
            {isMerchant && (
              <Link href="/dashboard">
                <Button size="sm" className="rounded-full gap-2 font-semibold">
                  <LayoutDashboard className="h-4 w-4" />
                  {t("btnDashboard")}
                </Button>
              </Link>
            )}
            <UserAvatar />
          </Show>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageToggle />
          <Show when="signed-in">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
              </Button>
            </Link>
          </Show>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <MobileNavLink href="/" icon={<Home className="h-4 w-4" />} onClick={() => setMobileOpen(false)}>
              {t("linkHome")}
            </MobileNavLink>
            <MobileNavLink href="/discover" icon={<Compass className="h-4 w-4" />} onClick={() => setMobileOpen(false)}>
              {t("linkDiscover")}
            </MobileNavLink>
            <MobileNavLink href="/meals" icon={<Utensils className="h-4 w-4" />} onClick={() => setMobileOpen(false)}>
              {t("linkMeals")}
            </MobileNavLink>
            <Show when="signed-in">
              <MobileNavLink href="/cart" icon={<ShoppingBag className="h-4 w-4" />} onClick={() => setMobileOpen(false)}>
                {t("linkCart")}
              </MobileNavLink>
              <MobileNavLink href="/track" icon={<Package className="h-4 w-4" />} onClick={() => setMobileOpen(false)}>
                {t("linkOrders")}
              </MobileNavLink>
            </Show>

            <Show when="signed-in">
              {isMerchant && (
                <div className="pt-3 border-t mt-2">
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-full gap-2 font-semibold">
                      <LayoutDashboard className="h-4 w-4" />
                      {t("btnOpenMerchantDashboard")}
                    </Button>
                  </Link>
                </div>
              )}
            </Show>

            <Show when="signed-out">
              <div className="pt-3 border-t mt-2 flex flex-col gap-2">
                <Link href="/auth/sign-in" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full font-semibold">
                    {t("btnSignIn")}
                  </Button>
                </Link>
                <Link href="/auth/sign-up" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-full font-semibold">
                    {t("btnCreateAccount")}
                  </Button>
                </Link>
                <Link href="//auth/merchant-sign-up" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full rounded-full text-muted-foreground font-medium text-sm">
                    {t("btnRegisterMerchant")}
                  </Button>
                </Link>
              </div>
            </Show>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileNavLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isExactActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isExactActive
        ? "bg-primary/10 text-primary"
        : "text-foreground hover:bg-muted"
        }`}
    >
      {icon}
      {children}
    </Link>
  );
}
