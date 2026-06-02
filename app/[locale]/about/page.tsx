import type { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import { useTranslations } from "next-intl";
import {
  Utensils,
  Truck,
  Users,
  Star,
  MapPin,
  Heart,
  Globe,
  Award,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const aboutPage = (t as any).AboutPage;

  return {
    title: aboutPage?.title || "About HungerHub",
    description: aboutPage?.subtitle || "Food you will actually love.",
  };
}

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  const STATS = [
    { value: "8+", label: t("stats.partnerRestaurants"), icon: Utensils },
    { value: "17", label: t("stats.menuItems"), icon: Award },
    { value: "2.4k", label: t("stats.happyCustomers"), icon: Users },
    { value: "4.9", label: t("stats.avgRating"), icon: Star },
  ];

  const VALUES = [
    {
      title: t("values.fresh.title"),
      description: t("values.fresh.description"),
      icon: Heart,
      color: "bg-orange-50 border-orange-100",
      iconBg: "bg-orange-500 text-white",
    },
    {
      title: t("values.community.title"),
      description: t("values.community.description"),
      icon: Users,
      color: "bg-stone-50 border-stone-100",
      iconBg: "bg-stone-800 text-white",
    },
    {
      title: t("values.speed.title"),
      description: t("values.speed.description"),
      icon: Truck,
      color: "bg-orange-50 border-orange-100",
      iconBg: "bg-orange-500 text-white",
    },
    {
      title: t("values.everyone.title"),
      description: t("values.everyone.description"),
      icon: Globe,
      color: "bg-stone-50 border-stone-100",
      iconBg: "bg-stone-800 text-white",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, rgba(249,115,22,0.15) 0%, transparent 60%),
                                 radial-gradient(circle at 70% 60%, rgba(249,115,22,0.08) 0%, transparent 50%)`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-6">
              <Utensils className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                {t("badge")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              {t("titlePart1")} <br />
              <span className="text-orange-500">{t("titlePart2")}</span>
            </h1>
            <p className="text-stone-400 text-lg md:text-xl max-w-lg leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-stone-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-orange-50 p-2.5 rounded-xl mb-3">
                  <Icon className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-stone-900">
                  {value}
                </div>
                <div className="text-sm text-stone-400 font-medium mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-stone-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">
              {t("valuesSubtitle")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900">
              {t("valuesTitle")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {VALUES.map(({ title, description, icon: Icon, color, iconBg }) => (
              <div
                key={title}
                className={`p-6 rounded-2xl border ${color} transition-all hover:shadow-md`}
              >
                <div className={`inline-flex p-2.5 rounded-xl ${iconBg} mb-4`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1.5 mb-6">
              <MapPin className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-orange-600">
                {t("missionBadge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-6">
              {t("missionTitle")}
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-8">
              {t("missionDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-stone-100 rounded-full text-sm font-semibold text-stone-700">
                {t("tags.tracking")}
              </span>
              <span className="px-4 py-2 bg-stone-100 rounded-full text-sm font-semibold text-stone-700">
                {t("tags.sourcing")}
              </span>
              <span className="px-4 py-2 bg-stone-100 rounded-full text-sm font-semibold text-stone-700">
                {t("tags.pricing")}
              </span>
              <span className="px-4 py-2 bg-stone-100 rounded-full text-sm font-semibold text-stone-700">
                {t("tags.merchantTools")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
