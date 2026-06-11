"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import {
  Mail, MapPin, Phone, Clock, Send, MessageSquare,
  CheckCircle2, Instagram, Twitter, Utensils,
} from "lucide-react";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

function ContactHero() {
  const t = useTranslations("ContactPage");
  return (
    <section className="bg-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)`
        }} />
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-6">
            <MessageSquare className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">{t("getInTouch")}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-stone-400 text-lg max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  const t = useTranslations("ContactPage.info");

  const CONTACTS = [
    { icon: Mail, label: t("emailLabel"), value: "hello@foodhub.app", href: "mailto:hello@foodhub.app" },
    { icon: Phone, label: t("phoneLabel"), value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, label: t("officeLabel"), value: t("officeValue") },
    { icon: Clock, label: t("hoursLabel"), value: t("hoursValue") },
  ];

  return (
    <div className="md:col-span-2 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-orange-500 p-2 rounded-xl">
            <Utensils className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-stone-900">FoodHub</span>
        </div>

        <div className="space-y-4">
          {CONTACTS.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="bg-white border border-stone-100 p-2 rounded-xl shrink-0">
                <Icon className="h-4 w-4 text-stone-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">{label}</p>
                {href ? (
                  <a href={href} className="text-sm font-semibold text-stone-800 hover:text-orange-600 transition-colors" dir="ltr">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-stone-800">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-stone-100">
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">{t("followUs")}</p>
        <div className="flex gap-2">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="p-2.5 bg-white border border-stone-200 rounded-xl text-stone-500 hover:text-orange-500 hover:border-orange-200 transition-all"
              title={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const t = useTranslations("ContactPage.form");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: t("fillFields"), variant: "destructive" });
      return;
    }
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="md:col-span-3">
      <form onSubmit={handleSubmit} className="bg-white border border-stone-100 rounded-2xl p-6 md:p-8 shadow-sm">
        {sent ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="bg-green-50 p-3 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-stone-900">{t("successTitle")}</h3>
              <p className="text-sm text-stone-500 mt-1">{t("successDesc")}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 block">
                  {t("nameLabel")}
                </label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder={t("namePlaceholder")}
                  className="bg-stone-50 border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 block">
                  {t("emailLabel")}
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder={t("emailPlaceholder")}
                  className="bg-stone-50 border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 block">
                {t("subjectLabel")}
              </label>
              <Input
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder={t("subjectPlaceholder")}
                className="bg-stone-50 border-stone-200 focus:border-orange-400 focus:ring-orange-400/20"
              />
            </div>

            <div className="mb-6">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 block">
                {t("messageLabel")}
              </label>
              <Textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder={t("messagePlaceholder")}
                rows={5}
                className="bg-stone-50 border-stone-200 focus:border-orange-400 focus:ring-orange-400/20 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl gap-2 font-bold bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Send className="h-4 w-4" />
              {t("sendButton")}
            </Button>
          </>
        )}
      </form>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ContactHero />
      <section className="py-16 md:py-24 bg-stone-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
