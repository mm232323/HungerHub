import type { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import { useTranslations } from "next-intl";
import { Shield, Lock, Eye, Server, Cookie, Bell, UserCheck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const privacyPage = (t as any).PrivacyPage;

  return {
    title: privacyPage?.title || "Privacy Policy",
    description: privacyPage?.subtitle || "Your privacy matters.",
  };
}

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

  const SECTIONS = [
    { icon: Eye, id: "infoCollect" },
    { icon: Lock, id: "howWeUse" },
    { icon: Server, id: "dataStorage" },
    { icon: Cookie, id: "cookies" },
    { icon: Bell, id: "communications" },
    { icon: UserCheck, id: "yourRights" },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-stone-950 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, rgba(249,115,22,0.12) 0%, transparent 60%)`,
          }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-6">
              <Shield className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                {t("badge")}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-lg mx-auto">
              {t("subtitle")}
            </p>
            <p className="text-stone-500 text-sm mt-6">
              {t("lastUpdated")}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {SECTIONS.map(({ icon: Icon, id }) => (
              <div key={id} className="flex gap-4">
                <div className="shrink-0">
                  <div className="bg-orange-50 border border-orange-100 p-2.5 rounded-xl">
                    <Icon className="h-4 w-4 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-stone-900 mb-2">
                    {t(`sections.${id}.title`)}
                  </h2>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {t(`sections.${id}.content`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-stone-100">
            <p className="text-sm text-stone-500 leading-relaxed">
              {t("contactPart1")}
              <a
                href="mailto:hello@foodhub.app"
                className="text-orange-600 font-semibold hover:underline"
              >
                hello@foodhub.app
              </a>
              {t("contactPart2")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
