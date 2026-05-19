"use client";

import Link from "next/link";
import { Utensils, ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  showMerchantCTA?: boolean;
}

export function Footer({ showMerchantCTA = false }: FooterProps) {
  return (
    <footer className="relative bg-background border-t pt-16 pb-8 overflow-hidden z-10">
      
      {/* ── Giant Outline Watermark (Exactly like the mockup) ── */}
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 font-black tracking-widest pointer-events-none select-none opacity-[0.03] dark:opacity-[0.02] text-[10rem] md:text-[14rem] uppercase whitespace-nowrap z-0"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px currentColor",
        }}
      >
        HungerHub
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* ── Upper Merchant CTA Card (Exactly like the mockup, rendered only on Home) ── */}
        {showMerchantCTA && (
          <div className="relative mb-20 rounded-[2.5rem] overflow-hidden p-8 md:p-12 shadow-2xl transition-all duration-500 hover:shadow-orange-500/5 group border border-border/20">
            {/* Rich multi-layered dark gradient background */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #09090b 0%, #111116 40%, #1c1917 80%, #0c0a09 100%)"
              }}
            />
            {/* Tech grid/glow blobs */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] -bottom-20 -right-20" />
              <div className="absolute w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[80px] -top-10 -left-10" />
              <div 
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: "24px 24px"
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              
              {/* Left Column: Heading */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 mb-6 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">
                    Partner With HungerHub
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                  Expand your restaurant's <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-300% animate-gradient-shift">
                    reach and double your sales
                  </span>
                </h2>
              </div>

              {/* Right Column: Description & Premium Actions */}
              <div className="max-w-md space-y-6 lg:text-right flex flex-col lg:items-end">
                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                  Manage orders live, utilize automatic delivery matching, and connect directly with thousands of hungry local food lovers.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button 
                    asChild
                    className="rounded-full bg-white hover:bg-white/95 text-black font-extrabold px-6 h-12 text-sm shadow-xl flex items-center gap-2 group/btn"
                  >
                    <Link href="/auth/merchant-sign-up">
                      Get started
                      <Sparkles className="h-4 w-4 text-orange-500 transition-transform group-hover/btn:scale-125" />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="ghost" 
                    className="rounded-full text-white hover:bg-white/10 font-bold px-6 h-12 text-sm gap-2"
                  >
                    <Link href="/discover">
                      <Play className="h-4 w-4 fill-white text-white" />
                      Watch how it works
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          
          {/* Logo & Slogan Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Utensils className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black tracking-tight">HungerHub</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Delivering premium local culinary experiences, home-cooked food gems, and passionate food creations right to your doorstep.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wider uppercase text-muted-foreground/60">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Contact Us", href: "/contact" },
                { label: "Blog", href: "/blog" }
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wider uppercase text-muted-foreground/60">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: "Documentation", href: "/docs" },
                { label: "API Reference", href: "/api-docs" },
                { label: "Help Center", href: "/help" },
                { label: "Merchant Dashboard", href: "/dashboard" }
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wider uppercase text-muted-foreground/60">Connect</h3>
            <ul className="space-y-3">
              {[
                { label: "X (Twitter)", href: "https://x.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "YouTube", href: "https://youtube.com" },
                { label: "Instagram", href: "https://instagram.com" }
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom Section (Exactly like the mockup) ── */}
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Pulsing Systems Operational Pill */}
          <div className="inline-flex items-center gap-2.5 bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-green-600 dark:text-green-400 text-xs font-bold tracking-wide">
              All systems operational
            </span>
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="font-medium">© 2026 HungerHub. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-foreground font-medium transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground font-medium transition-colors">Terms of Use</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
