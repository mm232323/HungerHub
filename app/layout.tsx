import type { Metadata } from "next";
import { Inter, Geist_Mono, Tajawal } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import "./globals.css";

import { Providers } from "./[locale]/providers";
import { Toaster } from "@/alerts/toaster";

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--tajawal-font",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const layout = (t as any).Layout;
  
  return {
    title: layout?.title || "HungerHub",
    description: layout?.description || "Food Delivery",
  };
}

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${geistMono.variable} ${tajawal.variable} h-full antialiased`}
      style={{ 
        "--app-font-sans": locale === 'ar' ? `var(${tajawal.variable})` : `var(${inter.variable})` 
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
