"use client";

import React, { useState, useEffect } from "react";
import { useGetMerchantProfile, useUpdateMerchantProfile } from "@/apis";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { customFetch } from "@/utils/api";
import { useListCategories } from "@/apis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useTranslations, useLocale } from "next-intl";
import {
  Building2,
  CalendarDays,
  Check,
  ChefHat,
  Clock,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Tag,
  Twitter,
  UploadCloud,
  Youtube,
  AlignLeft,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const t = useTranslations("DashboardSettings");
  const locale = useLocale();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useListCategories();

  const { data: profile, isLoading, refetch } = useGetMerchantProfile();
  const updateProfile = useUpdateMerchantProfile({
    mutation: {
      onSuccess: () => {
        toast({ title: t("toastUpdateSuccess") });
        refetch();
      },
      onError: (err: any) => {
        toast({
          title: t("toastUpdateErrorTitle"),
          description: err?.message || t("toastUpdateErrorDesc"),
          variant: "destructive",
        });
      },
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    cuisineType: "",
    establishedYear: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    openingHours: "",
    profileImage: "",
    coverImage: "",
    onlineOrdering: true,
    tableReservation: false,
    showReviews: true,
    deliveryFee: 0,
    additionalShowed: [] as string[],
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        name: profile.name || "",
        description: profile.bio || "",
        cuisineType: profile.cuisineType || "",
        address: profile.address || "",
        profileImage: profile.profileImage || "",
        coverImage: profile.coverImage || "",
        phone: profile.phone || "",
        email: profile.email || "",
        website: profile.website || "",
        facebook: profile.facebook || "",
        instagram: profile.instagram || "",
        twitter: profile.twitter || "",
        youtube: profile.youtube || "",
        openingHours: profile.openingHours || "",
        deliveryFee: profile.deliveryFee || 0,
        additionalShowed: profile.additionalShowed
          ? profile.additionalShowed.split(",")
          : [],
      }));
    }
  }, [profile]);

  const toggleAdditionalShowed = (field: string) => {
    setFormData((prev) => {
      const isSelected = prev.additionalShowed.includes(field);
      return {
        ...prev,
        additionalShowed: isSelected
          ? prev.additionalShowed.filter((f) => f !== field)
          : [...prev.additionalShowed, field],
      };
    });
  };

  const updateField = (
    field: keyof typeof formData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profileImage" | "coverImage",
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // show preview
      const previewUrl = URL.createObjectURL(file);
      updateField(field, previewUrl);

      // upload to Cloudinary
      setIsUploading(true);
      try {
        const toBase64 = (blob: Blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        const dataUri = await toBase64(file);

        const json = await customFetch<{ url: string }>("/upload", {
          method: "POST",
          body: { dataUri, folder: "merchant" },
        });

        if (json && json.url) {
          updateField(field, json.url);
          toast({ title: t("toastUploadSuccess") });
        } else {
          toast({ title: t("toastUploadFailed"), variant: "destructive" });
        }
      } catch (err) {
        console.error(err);
        toast({ title: t("toastUploadError"), variant: "destructive" });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = () => {
    updateProfile.mutate({
      data: {
        name: formData.name,
        bio: formData.description,
        cuisineType: formData.cuisineType,
        address: formData.address,
        profileImage: formData.profileImage,
        coverImage: formData.coverImage,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        facebook: formData.facebook,
        instagram: formData.instagram,
        twitter: formData.twitter,
        youtube: formData.youtube,
        openingHours: formData.openingHours,
        deliveryFee: Number(formData.deliveryFee),
        additionalShowed: formData.additionalShowed.join(","),
      },
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-stone-500">{t("loading")}</div>;
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6 pb-20 bg-[#F8F9FA] min-h-screen text-stone-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm text-stone-500 mt-1">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-stone-200 text-stone-700 bg-white shadow-sm  h-10 px-4 rounded-lg hover:bg-stone-50"
          >
            <Link
              href={`/merchant/${profile?.slug}`}
              className="flex items-center gap-2"
            >
              {t("preview")}
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            onClick={handleSave}
            disabled={updateProfile.isPending}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm flex items-center gap-2 h-10 px-5 rounded-lg border-0"
          >
            <Check className="h-4 w-4" />
            {updateProfile.isPending ? t("saving") : t("save")}
          </Button>
        </div>
      </div>

      {/* Branding Section */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
        <h2 className="text-lg font-bold text-stone-800">
          {t("brandingTitle")}
        </h2>
        <p className="text-sm text-stone-500 mt-1 mb-6">
          {t("brandingSubtitle")}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Logo */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-semibold text-stone-800">
                {t("logoTitle")}
              </h3>
              <p className="text-xs text-stone-500">{t("logoSubtitle")}</p>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 flex items-center justify-center relative bg-white h-[200px] overflow-hidden">

              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Logo"
                  className="max-w-[150px] max-h-[150px] object-contain"
                />
              ) : (
                <img
                  src="https://img.logoipsum.com/284.svg"
                  alt="Default Logo"
                  className="max-w-[150px] max-h-[150px] opacity-30 object-contain"
                />
              )}
            </div>

            <label
              className={`w-full border border-stone-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-white h-10 gap-2 relative overflow-hidden flex items-center justify-center rounded-md font-medium text-sm cursor-pointer transition-colors ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
            >
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profileImage")}
                disabled={isUploading}
              />
              <UploadCloud className="h-4 w-4 mr-2" />{" "}
              {isUploading ? t("uploading") : t("changeLogo")}
            </label>
            <p
              className="text-xs text-stone-400 leading-snug"
              dangerouslySetInnerHTML={{ __html: t("logoSize") }}
            ></p>
          </div>

          {/* Banner */}
          <div className="w-full lg:w-2/3 flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-semibold text-stone-800">
                {t("bannerTitle")}
              </h3>
              <p className="text-xs text-stone-500">{t("bannerSubtitle")}</p>
            </div>

            <div className="border border-stone-200 rounded-xl overflow-hidden relative bg-stone-100 h-[200px] w-full">

              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-400">
                  {t("bannerPlaceholder")}
                </div>
              )}
            </div>

            <label
              className={`w-[180px] border border-stone-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-white h-10 gap-2 relative overflow-hidden flex items-center justify-center rounded-md font-medium text-sm cursor-pointer transition-colors ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
            >
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "coverImage")}
                disabled={isUploading}
              />
              <UploadCloud className="h-4 w-4 mr-2" />{" "}
              {isUploading ? t("uploading") : t("changeBanner")}
            </label>
            <p
              className="text-xs text-stone-400 leading-snug"
              dangerouslySetInnerHTML={{ __html: t("bannerSize") }}
            ></p>
          </div>
        </div>
      </div>

      {/* Two Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Information */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
          <h2 className="text-lg font-bold text-stone-800 mb-6">
            {t("infoTitle")}
          </h2>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("nameLabel")}
              </Label>
              <div className="relative">
                <Input
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="pr-10 rtl:pr-3 rtl:pl-10 h-10 border-stone-200 text-stone-700"
                />
                <Building2 className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>



            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("descLabel")}
              </Label>
              <div className="relative">
                <Textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={4}
                  className="pr-10 rtl:pr-3 rtl:pl-10 resize-none border-stone-200 text-stone-700"
                />
                <AlignLeft className="absolute right-3 rtl:right-auto rtl:left-3 top-3 h-4 w-4 text-orange-500 opacity-60" />
              </div>
              <div className="text-right rtl:text-left text-xs text-stone-400">
                123/300
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("cuisineLabel")}
              </Label>
              <Select
                value={formData.cuisineType}
                onValueChange={(val) => updateField("cuisineType", val)}
              >
                <SelectTrigger className="h-10 text-[15px] border-stone-200 text-stone-700 w-full pl-10 pr-3 rtl:pr-10 rtl:pl-3 relative focus:border-orange-400 focus:ring-orange-400/20">
                  <ChefHat className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60 z-10" />
                  <SelectValue
                    placeholder={
                      isLoadingCategories ? "Loading..." : "Select category"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {categories.map((c) => (
                    <SelectItem
                      key={c.slug}
                      value={c.name}
                      className="flex items-center gap-2 py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 inline-flex items-center justify-center text-lg leading-none"
                          dangerouslySetInnerHTML={{ __html: c.icon }}
                        />
                        <span>
                          {locale === "ar" ? c.name_ar || c.name : c.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("deliveryFeeLabel") || "Delivery Fee"}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.deliveryFee}
                  onChange={(e) => updateField("deliveryFee", e.target.value)}
                  className="pr-10 rtl:pr-3 rtl:pl-10 h-10 border-stone-200 text-stone-700"
                />
                <DollarSign className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
          <h2 className="text-lg font-bold text-stone-800 mb-6">
            {t("contactTitle")}
          </h2>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("phoneLabel")}
              </Label>
              <div className="relative">
                <Input
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="pr-10 rtl:pr-3 rtl:pl-10 h-10 border-stone-200 text-stone-700"
                />
                <Phone className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("emailLabel")}
              </Label>
              <div className="relative">
                <Input
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="pr-10 rtl:pr-3 rtl:pl-10 h-10 border-stone-200 text-stone-700"
                />
                <Mail className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("addressLabel")}
              </Label>
              <div className="relative">
                <Textarea
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  rows={3}
                  className="pr-10 rtl:pr-3 rtl:pl-10 resize-none border-stone-200 text-stone-700"
                />
                <MapPin className="absolute right-3 rtl:right-auto rtl:left-3 top-3 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("websiteLabel")}
              </Label>
              <div className="relative">
                <Input
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  className="pr-10 rtl:pr-3 rtl:pl-10 h-10 border-stone-200 text-stone-700"
                />
                <Globe className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">
                {t("hoursLabel")}
              </Label>
              <div className="flex flex-wrap items-center gap-2">
                <Select 
                  value={(() => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+(?:\s*[APM]+)?)\s*-\s*([\d:]+(?:\s*[APM]+)?)/i);
                    return match ? match[1] : "Mon";
                  })()} 
                  onValueChange={(val) => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+(?:\s*[APM]+)?)\s*-\s*([\d:]+(?:\s*[APM]+)?)/i);
                    const toDay = match ? match[2] : "Sun";
                    const fromTime = match ? match[3] : "09:00";
                    const toTime = match ? match[4] : "22:00";
                    updateField("openingHours", `${val} - ${toDay} ${fromTime} - ${toTime}`);
                  }}
                >
                  <SelectTrigger className="w-24 h-10 bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
                
                <span className="text-stone-500">-</span>
                
                <Select 
                  value={(() => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+(?:\s*[APM]+)?)\s*-\s*([\d:]+(?:\s*[APM]+)?)/i);
                    return match ? match[2] : "Sun";
                  })()} 
                  onValueChange={(val) => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+(?:\s*[APM]+)?)\s*-\s*([\d:]+(?:\s*[APM]+)?)/i);
                    const fromDay = match ? match[1] : "Mon";
                    const fromTime = match ? match[3] : "09:00";
                    const toTime = match ? match[4] : "22:00";
                    updateField("openingHours", `${fromDay} - ${val} ${fromTime} - ${toTime}`);
                  }}
                >
                  <SelectTrigger className="w-24 h-10 bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Clock className="h-4 w-4 text-stone-400 mx-1" />

                <Input 
                  type="time" 
                  value={(() => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+)\s*-\s*([\d:]+)/i);
                    return match ? match[3] : "09:00";
                  })()} 
                  onChange={e => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+(?:\s*[APM]+)?)\s*-\s*([\d:]+(?:\s*[APM]+)?)/i);
                    const fromDay = match ? match[1] : "Mon";
                    const toDay = match ? match[2] : "Sun";
                    const toTime = match ? match[4] : "22:00";
                    updateField("openingHours", `${fromDay} - ${toDay} ${e.target.value} - ${toTime}`);
                  }} 
                  className="w-32 h-10 bg-white" 
                />
                
                <span className="text-stone-500">-</span>
                
                <Input 
                  type="time" 
                  value={(() => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+)\s*-\s*([\d:]+)/i);
                    return match ? match[4] : "22:00";
                  })()} 
                  onChange={e => {
                    const match = formData.openingHours.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)\s+([\d:]+(?:\s*[APM]+)?)\s*-\s*([\d:]+(?:\s*[APM]+)?)/i);
                    const fromDay = match ? match[1] : "Mon";
                    const toDay = match ? match[2] : "Sun";
                    const fromTime = match ? match[3] : "09:00";
                    updateField("openingHours", `${fromDay} - ${toDay} ${fromTime} - ${e.target.value}`);
                  }} 
                  className="w-32 h-10 bg-white" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
        <h2 className="text-lg font-bold text-stone-800">{t("socialTitle")}</h2>
        <p className="text-sm text-stone-500 mt-1 mb-6">
          {t("socialSubtitle")}
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Facebook className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 h-4 w-4 text-[#1877F2]" />
            <Input
              value={formData.facebook}
              onChange={(e) => updateField("facebook", e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10 h-10 border-stone-200 text-stone-600 text-sm"
              placeholder="facebook.com/delicio"
            />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Instagram className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 h-4 w-4 text-[#E4405F]" />
            <Input
              value={formData.instagram}
              onChange={(e) => updateField("instagram", e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10 h-10 border-stone-200 text-stone-600 text-sm"
              placeholder="instagram.com/delicio"
            />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Twitter className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 h-4 w-4 text-[#1DA1F2]" />
            <Input
              value={formData.twitter}
              onChange={(e) => updateField("twitter", e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10 h-10 border-stone-200 text-stone-600 text-sm"
              placeholder="twitter.com/delicio"
            />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Youtube className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 h-4 w-4 text-[#FF0000]" />
            <Input
              value={formData.youtube}
              onChange={(e) => updateField("youtube", e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10 h-10 border-stone-200 text-stone-600 text-sm"
              placeholder="youtube.com/delicio"
            />
          </div>
        </div>
      </div>

      {/* Profile Display Options */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
        <h2 className="text-lg font-bold text-stone-800">
          {t("displayOptionsTitle") || "Profile Display Options"}
        </h2>
        <p className="text-sm text-stone-500 mt-1 mb-6">
          {t("displayOptionsSubtitle") ||
            "Choose which information to display on your public merchant page"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "phone",
              label: t("optPhone") || "Phone Number",
              icon: <Phone className="h-4 w-4" />,
            },
            {
              id: "email",
              label: t("optEmail") || "Email Address",
              icon: <Mail className="h-4 w-4" />,
            },
            {
              id: "website",
              label: t("optWebsite") || "Website URL",
              icon: <Globe className="h-4 w-4" />,
            },
            {
              id: "facebook",
              label: t("optFacebook") || "Facebook",
              icon: <Facebook className="h-4 w-4 text-[#1877F2]" />,
            },
            {
              id: "instagram",
              label: t("optInstagram") || "Instagram",
              icon: <Instagram className="h-4 w-4 text-[#E4405F]" />,
            },
            {
              id: "twitter",
              label: t("optTwitter") || "Twitter",
              icon: <Twitter className="h-4 w-4 text-[#1DA1F2]" />,
            },
            {
              id: "youtube",
              label: t("optYouTube") || "YouTube",
              icon: <Youtube className="h-4 w-4 text-[#FF0000]" />,
            },
            {
              id: "openingHours",
              label: t("optOpeningHours") || "Opening Hours",
              icon: <Clock className="h-4 w-4" />,
            },
          ].map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between p-4 border rounded-xl border-stone-100 bg-stone-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-md shadow-sm border border-stone-100">
                  {field.icon}
                </div>
                <span className="text-sm font-semibold text-stone-700">
                  {field.label}
                </span>
              </div>
              <Switch
                checked={formData.additionalShowed.includes(field.id)}
                onCheckedChange={() => toggleAdditionalShowed(field.id)}
                className="data-[state=checked]:bg-orange-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
