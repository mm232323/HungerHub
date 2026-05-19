import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { Toaster } from "@/alerts/toaster";

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HungerHub - Food You'll Actually Love",
  description: "Discover local gems, order in minutes, and track your delivery live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={{ "--app-font-sans": `var(${inter.variable})` } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
