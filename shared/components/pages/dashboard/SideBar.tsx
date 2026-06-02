"use client";

import {
  BarChart3,
  ClipboardList,
  Compass,
  Home,
  LayoutDashboard,
  Megaphone,
  Package,
  ShoppingCart,
  Utensils,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import NavItem from "./NavItem";
import { useTranslations } from "next-intl";
import ConsumerNavItem from "./ConsumerNavItem";
import UserProfile from "./UserProfile";

function SideBar() {
  const t = useTranslations("Dashboard.Shell");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#111110] border-b border-white/[0.07] shrink-0 w-full z-20 relative">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="bg-orange-500 p-[7px] rounded-[10px] shadow-lg shadow-orange-500/25 shrink-0">
            <Utensils className="h-[15px] w-[15px] text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight truncate">
            {t("brand")}
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-[240px] sm:w-[220px] shrink-0 flex flex-col h-full transition-transform duration-300 transform md:transform-none ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: "linear-gradient(180deg,#111110 0%,#0d0d0c 100%)",
        }}
      >
        {/* Brand */}
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-white/[0.07]">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="bg-orange-500 p-[7px] rounded-[10px] shadow-lg shadow-orange-500/25 shrink-0">
              <Utensils className="h-[15px] w-[15px] text-white" />
            </div>
            <span className="text-white font-bold text-sm sm:text-lg tracking-tight truncate">
              {t("brand")}
            </span>
          </Link>
          <div className="flex items-center gap-1.5 mt-2 ml-[3px]">
            <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-white/30 font-medium tracking-wide truncate">
              {t("merchantDashboard")}
            </span>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-3 sm:py-4 min-h-0">
          {/* Restaurant section */}
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 px-2 sm:px-3 mb-2">
            {t("myRestaurant")}
          </p>
          <nav className="space-y-0.5 mb-4 sm:mb-5">
            <NavItem
              href="/dashboard"
              icon={LayoutDashboard}
              label={t("overview")}
              exact
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <NavItem
              href="/dashboard/orders"
              icon={ClipboardList}
              label={t("orders")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <NavItem
              href="/dashboard/products"
              icon={Package}
              label={t("products")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <NavItem
              href="/dashboard/marketing"
              icon={Megaphone}
              label={t("marketing")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <NavItem
              href="/dashboard/analytics"
              icon={BarChart3}
              label={t("analytics")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <NavItem
              href="/dashboard/settings"
              icon={Settings}
              label="Settings"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </nav>

          {/* Divider */}
          <div className="border-t border-white/[0.07] mx-1 sm:mx-2 mb-4 sm:mb-5" />

          {/* Consumer section */}
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 px-2 sm:px-3 mb-2">
            {t("browseHungerHub")}
          </p>
          <nav className="space-y-0.5">
            <ConsumerNavItem
              href="/"
              icon={Home}
              label={t("home")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <ConsumerNavItem
              href="/discover"
              icon={Compass}
              label={t("discoverFood")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <ConsumerNavItem
              href="/cart"
              icon={ShoppingCart}
              label={t("myCart")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </nav>
        </div>

        {/* User profile */}
        <UserProfile />
      </aside>
    </>
  );
}

export default SideBar;
