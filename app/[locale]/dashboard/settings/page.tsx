"use client";

import React, { useState, useEffect } from "react";
import { useGetMerchantProfile, useUpdateMerchantProfile } from "@/apis";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";
import { toast } from "@/hooks/use-toast";
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
  Plus, 
  ShoppingBag, 
  Star, 
  Tag, 
  Twitter, 
  UploadCloud, 
  Youtube,
  AlignLeft,
  Calendar
} from "lucide-react";

export default function SettingsPage() {
  const { data: profile, isLoading, refetch } = useGetMerchantProfile();
  const updateProfile = useUpdateMerchantProfile({
    mutation: {
      onSuccess: () => {
        toast({ title: "Profile updated successfully!" });
        refetch();
      },
      onError: (err: any) => {
        toast({ 
          title: "Error updating profile", 
          description: err?.message || "Failed to save changes.", 
          variant: "destructive" 
        });
      }
    }
  });

  const [formData, setFormData] = useState({
    name: "Delicio Restaurant",
    tagline: "Good Food, Good Mood",
    description: "At Delicio, we serve delicious food made with fresh ingredients and lots of love. Our mission is to provide an unforgettable dining experience.",
    cuisineType: "Italian, Continental",
    establishedYear: "2018",
    phone: "+1 234 567 8900",
    email: "info@delicio.com",
    address: "123 Food Street, Flavor Town, New York, NY 10001, USA",
    website: "www.delicio.com",
    openingHours: "Mon - Sun  9:00 AM - 10:00 PM",
    profileImage: "",
    coverImage: "",
    onlineOrdering: true,
    tableReservation: false,
    showReviews: true,
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name || prev.name,
        description: profile.bio || prev.description,
        cuisineType: profile.cuisineType || prev.cuisineType,
        address: profile.address || prev.address,
        profileImage: profile.profileImage || prev.profileImage,
        coverImage: profile.coverImage || prev.coverImage,
      }));
    }
  }, [profile]);

  const updateField = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      }
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-stone-500">Loading settings...</div>;
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6 pb-20 bg-[#F8F9FA] min-h-screen text-stone-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Restaurant Settings</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your restaurant profile, branding and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-stone-200 text-stone-700 bg-white shadow-sm flex items-center gap-2 h-10 px-4 rounded-lg hover:bg-stone-50">
            Preview Store <ExternalLink className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={updateProfile.isPending}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm flex items-center gap-2 h-10 px-5 rounded-lg border-0"
          >
            <Check className="h-4 w-4" />
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Branding Section */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
        <h2 className="text-lg font-bold text-stone-800">Branding</h2>
        <p className="text-sm text-stone-500 mt-1 mb-6">Manage your restaurant logo and banner</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Logo */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-semibold text-stone-800">Logo</h3>
              <p className="text-xs text-stone-500">This logo will be shown in your store</p>
            </div>
            
            <div className="border border-stone-200 rounded-xl p-4 flex items-center justify-center relative bg-white h-[200px] overflow-hidden">
              <div className="absolute top-3 right-3 bg-white border border-stone-200 shadow-sm rounded-md p-1.5 cursor-pointer hover:bg-stone-50 z-10">
                <Pencil className="h-4 w-4 text-stone-600" />
              </div>
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Logo" className="max-w-[150px] max-h-[150px] object-contain" />
              ) : (
                <img src="https://img.logoipsum.com/284.svg" alt="Default Logo" className="max-w-[150px] max-h-[150px] opacity-30 object-contain" />
              )}
            </div>
            
            <Button variant="outline" className="w-full border-stone-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-white h-10 gap-2">
              <UploadCloud className="h-4 w-4" /> Change Logo
            </Button>
            <p className="text-xs text-stone-400 leading-snug">Recommended size: 512x512px<br/>PNG, JPG up to 2MB</p>
          </div>

          {/* Banner */}
          <div className="w-full lg:w-2/3 flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-semibold text-stone-800">Banner</h3>
              <p className="text-xs text-stone-500">This banner will be shown at the top of your store</p>
            </div>
            
            <div className="border border-stone-200 rounded-xl overflow-hidden relative bg-stone-100 h-[200px] w-full">
              <div className="absolute top-3 right-3 bg-white border border-stone-200 shadow-sm rounded-md p-1.5 cursor-pointer hover:bg-stone-50 z-10">
                <Pencil className="h-4 w-4 text-stone-600" />
              </div>
              {formData.coverImage ? (
                <img src={formData.coverImage} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-400">Banner Placeholder</div>
              )}
            </div>
            
            <Button variant="outline" className="w-[180px] border-stone-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-white h-10 gap-2">
              <UploadCloud className="h-4 w-4" /> Change Banner
            </Button>
            <p className="text-xs text-stone-400 leading-snug">Recommended size: 1920x600px<br/>PNG, JPG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Two Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Restaurant Information */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
          <h2 className="text-lg font-bold text-stone-800 mb-6">Restaurant Information</h2>
          
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Restaurant Name</Label>
              <div className="relative">
                <Input value={formData.name} onChange={e => updateField('name', e.target.value)} className="pr-10 h-10 border-stone-200 text-stone-700" />
                <Building2 className="absolute right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Tagline</Label>
              <div className="relative">
                <Input value={formData.tagline} onChange={e => updateField('tagline', e.target.value)} className="pr-10 h-10 border-stone-200 text-stone-700" />
                <Tag className="absolute right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
              <p className="text-xs text-stone-400">A short tagline for your restaurant</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Description</Label>
              <div className="relative">
                <Textarea value={formData.description} onChange={e => updateField('description', e.target.value)} rows={4} className="pr-10 resize-none border-stone-200 text-stone-700" />
                <AlignLeft className="absolute right-3 top-3 h-4 w-4 text-orange-500 opacity-60" />
              </div>
              <div className="text-right text-xs text-stone-400">123/300</div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Cuisine Type</Label>
              <div className="relative">
                <Input value={formData.cuisineType} onChange={e => updateField('cuisineType', e.target.value)} className="pr-10 h-10 border-stone-200 text-stone-700" />
                <ChefHat className="absolute right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Established Year</Label>
              <div className="relative">
                <Input value={formData.establishedYear} onChange={e => updateField('establishedYear', e.target.value)} className="pr-10 h-10 border-stone-200 text-stone-700" />
                <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
          <h2 className="text-lg font-bold text-stone-800 mb-6">Contact Information</h2>
          
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Phone Number</Label>
              <div className="relative">
                <Input value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="pr-10 h-10 border-stone-200 text-stone-700" />
                <Phone className="absolute right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Email Address</Label>
              <div className="relative">
                <Input value={formData.email} onChange={e => updateField('email', e.target.value)} className="pr-10 h-10 border-stone-200 text-stone-700" />
                <Mail className="absolute right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Address</Label>
              <div className="relative">
                <Textarea value={formData.address} onChange={e => updateField('address', e.target.value)} rows={3} className="pr-10 resize-none border-stone-200 text-stone-700" />
                <MapPin className="absolute right-3 top-3 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Website</Label>
              <div className="relative">
                <Input value={formData.website} onChange={e => updateField('website', e.target.value)} className="pr-10 h-10 border-stone-200 text-stone-700" />
                <Globe className="absolute right-3 top-2.5 h-4 w-4 text-orange-500 opacity-60" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-stone-700">Opening Hours</Label>
              <div className="relative flex items-center bg-white border border-stone-200 rounded-md px-3 h-10 overflow-hidden">
                <Clock className="h-4 w-4 text-orange-500 opacity-60 mr-3 shrink-0" />
                <Input value={formData.openingHours} onChange={e => updateField('openingHours', e.target.value)} className="border-0 p-0 h-full shadow-none focus-visible:ring-0 text-stone-700 font-medium" />
                <Pencil className="h-4 w-4 text-orange-500 opacity-60 ml-3 shrink-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
        <h2 className="text-lg font-bold text-stone-800">Social Media</h2>
        <p className="text-sm text-stone-500 mt-1 mb-6">Add your social media links</p>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Facebook className="absolute left-3 top-2.5 h-4 w-4 text-[#1877F2]" />
            <Input defaultValue="facebook.com/delicio" className="pl-10 h-10 border-stone-200 text-stone-600 text-sm" />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Instagram className="absolute left-3 top-2.5 h-4 w-4 text-[#E4405F]" />
            <Input defaultValue="instagram.com/delicio" className="pl-10 h-10 border-stone-200 text-stone-600 text-sm" />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Twitter className="absolute left-3 top-2.5 h-4 w-4 text-[#1DA1F2]" />
            <Input defaultValue="twitter.com/delicio" className="pl-10 h-10 border-stone-200 text-stone-600 text-sm" />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Youtube className="absolute left-3 top-2.5 h-4 w-4 text-[#FF0000]" />
            <Input defaultValue="youtube.com/delicio" className="pl-10 h-10 border-stone-200 text-stone-600 text-sm" />
          </div>
          <Button variant="outline" className="w-10 h-10 p-0 shrink-0 border-stone-200 text-stone-600 bg-white">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
        <h2 className="text-lg font-bold text-stone-800">Additional Settings</h2>
        <p className="text-sm text-stone-500 mt-1 mb-6">Manage other preferences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-2.5 rounded-xl shrink-0">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-stone-800">Online Ordering</h4>
              <p className="text-xs text-stone-500 mt-0.5">Allow customers to place orders online</p>
            </div>
            <Switch 
              checked={formData.onlineOrdering} 
              onCheckedChange={val => updateField('onlineOrdering', val)} 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-2.5 rounded-xl shrink-0">
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-stone-800">Table Reservation</h4>
              <p className="text-xs text-stone-500 mt-0.5">Allow customers to book tables</p>
            </div>
            <Switch 
              checked={formData.tableReservation} 
              onCheckedChange={val => updateField('tableReservation', val)} 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-2.5 rounded-xl shrink-0">
              <Star className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-stone-800">Show Reviews</h4>
              <p className="text-xs text-stone-500 mt-0.5">Display customer reviews on store</p>
            </div>
            <Switch 
              checked={formData.showReviews} 
              onCheckedChange={val => updateField('showReviews', val)} 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
