import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../alerts/skeleton";
import { CheckCircle2, Trash2, Utensils, X, Save, Clock, Tag, PlusCircle, LinkIcon, UploadCloud } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Switch } from "../../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../alerts/dialog";
import { ScrollArea } from "../../ui/scroll-area";
import { Product } from "@/types";
import { useDeleteProduct, useGetDashboardProducts, useUpdateProduct, useListCategories } from "@/apis";
import { toast } from "@/hooks/use-toast";
import { useTranslations, useLocale } from "next-intl";
import { customFetch } from '@/utils/api';

function EditProductModal({ product, onUpdated }: { product: Product, onUpdated?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const t = useTranslations("Dashboard.Products");
  const tSetup = useTranslations("MerchantSetup.Steps.step2");
  const toastT = useTranslations("Toasts");
  const locale = useLocale();
  const { data: categories } = useListCategories({
    query: { queryKey: ["/categories"] }
  });

  const parseTags = (tags: any): string => {
    if (!tags) return '';
    if (Array.isArray(tags)) return tags.join(', ');
    if (typeof tags === 'string') {
      let cleaned = tags.trim();
      if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
        cleaned = cleaned.slice(1, -1);
      } else if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
        try {
          const parsed = JSON.parse(cleaned);
          if (Array.isArray(parsed)) return parsed.join(', ');
        } catch { /* ignore */ }
      }
      return cleaned;
    }
    return '';
  };

  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price?.toString() || '',
    image: product.image || '',
    category: product.category || '',
    preparationTime: product.preparationTime?.toString() || '',
    dietaryTags: parseTags(product.dietaryTags),
    customizations: parseTags(product.customizations),
    facebookUrl: product.facebookUrl || '',
    instagramUrl: product.instagramUrl || '',
    isAvailable: product.isAvailable ?? true,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        image: product.image || '',
        category: product.category || '',
        preparationTime: product.preparationTime?.toString() || '',
        dietaryTags: parseTags(product.dietaryTags),
        customizations: parseTags(product.customizations),
        facebookUrl: product.facebookUrl || '',
        instagramUrl: product.instagramUrl || '',
        isAvailable: product.isAvailable ?? true,
      });
    }
  }, [isOpen, product]);

  const updateFormData = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      setIsUploading(true)
      try {
        const toBase64 = (blob: Blob) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
        const dataUri = await toBase64(file)

        const json = await customFetch<{ url: string }>('/upload', {
          method: 'POST',
          body: { dataUri, folder: 'products' },
        })
        
        if (json && json.url) {
          updateFormData('image', json.url)
          toast({ title: t("uploadSuccess") || "Image uploaded successfully" })
        } else {
          toast({ title: t("uploadFailed") || toastT("uploadFailed"), variant: "destructive" })
        }
      } catch (err) {
        console.error(err)
        toast({ title: t("uploadError") || toastT("uploadError"), variant: "destructive" })
      } finally {
        setIsUploading(false)
      }
    }
  }

  const updateProduct = useUpdateProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: toastT("productUpdated") });
        setIsOpen(false);
        onUpdated?.();
      },
      onError: (err: any) => {
        toast({ 
          title: "Error updating product", 
          description: err?.message || "Failed to update product.", 
          variant: "destructive" 
        });
      }
    }
  });

  const handleSave = () => {
    if (!formData.name?.trim() || !formData.price || !formData.category || !formData.description?.trim()) {
      toast({ title: toastT("fillFields"), variant: "destructive" });
      return;
    }

    updateProduct.mutate({
      id: product.id,
      data: {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        image: formData.image || "https://placehold.co/600x400?text=Product",
        category: formData.category,
        preparationTime: formData.preparationTime ? Number(formData.preparationTime) : null,
        dietaryTags: formData.dietaryTags ? formData.dietaryTags.split(",").map(t => t.trim()).filter(t => t) : [],
        customizations: formData.customizations ? formData.customizations.split(",").map(t => t.trim()).filter(t => t) : [],
        facebookUrl: formData.facebookUrl?.trim() || null,
        instagramUrl: formData.instagramUrl?.trim() || null,
        isAvailable: formData.isAvailable,
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl shadow-sm text-base">
          {t("editProduct")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b bg-stone-50/50">
          <DialogTitle className="text-xl">{t("editProduct")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh]">
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("basicInfo")}</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>{t("nameLabel")}</Label>
                  <Input value={formData.name} onChange={e => updateFormData('name', e.target.value)} className="bg-stone-50/50" />
                </div>
                <div className="space-y-2">
                  <Label>{t("descLabel")}</Label>
                  <Textarea value={formData.description} onChange={e => updateFormData('description', e.target.value)} className="resize-none bg-stone-50/50" rows={3} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("image")}</h3>
                <div className="flex bg-stone-100 p-1 rounded-lg">
                  <button onClick={() => setUploadMode("file")} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${uploadMode === "file" ? "bg-white shadow-sm" : "text-stone-500 hover:text-stone-700"}`}>
                    {t("upload")}
                  </button>
                  <button onClick={() => setUploadMode("url")} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${uploadMode === "url" ? "bg-white shadow-sm" : "text-stone-500 hover:text-stone-700"}`}>
                    {t("urlLink")}
                  </button>
                </div>
              </div>
              
              {uploadMode === "file" ? (
                <div className="space-y-2">
                  <label className={`relative block border-2 border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer group ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                    <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-stone-900">{isUploading ? t("uploading") || "Uploading..." : t("uploadDesc1")}</p>
                    <p className="text-xs text-stone-500 mt-1">{t("uploadDesc2")}</p>
                  </label>
                  {formData.image && formData.image.startsWith('http') && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-stone-200 h-32 w-48 relative bg-stone-100 group/preview">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <button
                        onClick={(e) => { e.preventDefault(); updateFormData('image', ''); }}
                        className="absolute top-2 right-2 bg-white/80 hover:bg-red-50 text-stone-600 hover:text-red-500 rounded-full p-1.5 opacity-0 group-hover/preview:opacity-100 transition-all backdrop-blur-sm shadow-sm"
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <Input value={formData.image} onChange={e => updateFormData('image', e.target.value)} className="pl-9 bg-stone-50/50" />
                  </div>
                  {formData.image && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-stone-200 h-32 w-48 relative bg-stone-100 group/preview">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <button
                        onClick={(e) => { e.preventDefault(); updateFormData('image', ''); }}
                        className="absolute top-2 right-2 bg-white/80 hover:bg-red-50 text-stone-600 hover:text-red-500 rounded-full p-1.5 opacity-0 group-hover/preview:opacity-100 transition-all backdrop-blur-sm shadow-sm"
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("pricingCategory")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("priceLabel")}</Label>
                  <Input value={formData.price} onChange={e => updateFormData('price', e.target.value)} type="number" className="bg-stone-50/50" />
                </div>
                <div className="space-y-2">
                  <Label>{t("categoryLabel")}</Label>
                  <Select value={formData.category} onValueChange={val => updateFormData('category', val)}>
                    <SelectTrigger className="bg-stone-50/50"><SelectValue placeholder={t("categoryPlaceholder")} /></SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                         <SelectItem key={cat.id} value={cat.slug}>
                           {locale === 'ar' ? (cat.name_ar || cat.name) : cat.name}
                         </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("details") || "Details"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Clock className="h-3 w-3 text-stone-400"/> {t("prepTimeLabel") || "Preparation Time"}</Label>
                  <Input 
                    value={formData.preparationTime} 
                    onChange={e => updateFormData('preparationTime', e.target.value)} 
                    type="number" 
                    placeholder={t("prepTimePlaceholder") || "e.g. 15"} 
                    className="bg-stone-50/50" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Tag className="h-3 w-3 text-stone-400"/> {t("dietaryTagsLabel") || "Dietary Tags"} (Max 5)</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Spicy",
                      "Vegan-friendly",
                      "Gluten-free",
                      "Family meals",
                      "Late night",
                      "Lunch specials",
                      "Organic",
                      "Street food",
                      "Fine dining",
                      "Quick bites",
                    ].map((tag) => {
                      const tags = formData.dietaryTags ? formData.dietaryTags.split(',').map(t=>t.trim()).filter(Boolean) : [];
                      const isSelected = tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              updateFormData('dietaryTags', tags.filter(t => t !== tag).join(', '));
                            } else if (tags.length < 5) {
                              updateFormData('dietaryTags', [...tags, tag].join(', '));
                            }
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            isSelected
                              ? "bg-stone-900 text-white border-stone-900"
                              : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          {tSetup(`tags.${tag}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2"><PlusCircle className="h-3 w-3 text-stone-400"/> {t("customizationsLabel") || "Customizations"}</Label>
                  <Input 
                    value={formData.customizations} 
                    onChange={e => updateFormData('customizations', e.target.value)} 
                    placeholder={t("customizationsPlaceholder") || "Extra cheese, No onions"} 
                    className="bg-stone-50/50" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("availability")}</h3>
              <div className="flex items-center gap-3 bg-stone-50/50 p-4 rounded-xl border border-stone-100">
                  <Switch checked={formData.isAvailable} onCheckedChange={val => updateFormData('isAvailable', val)} />
                  <div className="flex flex-col">
                      <span className="font-semibold text-sm">{t("productStatus")}</span>
                      <span className="text-xs text-stone-500">{t("availabilityDesc")}</span>
                  </div>
              </div>
            </div>

          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-stone-50 flex justify-end gap-3 rounded-b-lg">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>{t("cancel")}</Button>
          <Button onClick={handleSave} disabled={updateProduct.isPending}>
            {updateProduct.isPending ? t("saving") : t("saveChanges")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductTabBody({ filteredProducts, onUpdated }: { filteredProducts: Product[], onUpdated?: () => void }) {
  const t = useTranslations("Dashboard.Products");
  const toastT = useTranslations("Toasts");
  const locale = useLocale();
  const { data: categories } = useListCategories({
    query: { queryKey: ["/categories"] }
  });
  const { isLoading, refetch } = useGetDashboardProducts({
    query: { queryKey: ["/dashboard/products"] },
  });
  const deleteProduct = useDeleteProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: toastT("productDeleted") });
        refetch();
        onUpdated?.();
      },
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border border-stone-100 shadow-sm rounded-2xl">
            <div className="h-56 bg-stone-100 animate-pulse" />
            <CardContent className="p-5 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))
      ) : filteredProducts.length === 0 ? (
        <div className="col-span-full py-16 text-center text-stone-500 bg-white rounded-3xl border border-stone-100 border-dashed">
          {t("noProducts")}
        </div>
      ) : (
        filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow rounded-[24px] bg-white flex flex-col group">
            {/* Image section with full width and height mimicking the reference */}
            <div className="relative h-48 w-full bg-stone-50">

              <img
                src={product.image || "https://placehold.co/600x400?text=No+Image"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <CardContent className="p-5 flex flex-col flex-1 gap-4">
              {/* Badges */}
              <div className="flex items-center justify-between">
                <Badge className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200/50 rounded-full px-2.5 py-1 text-[11px] font-bold flex items-center gap-1.5 shadow-none">
                  <Utensils className="h-3.5 w-3.5" />
                  HungerHub
                </Badge>
                <div className="flex items-center gap-1.5 text-sm font-bold text-stone-500">
                  <CheckCircle2 className="h-4 w-4 text-stone-400" />
                  {product.isAvailable ? t("statusActive") : t("statusHidden")}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-xl text-stone-900 leading-tight">
                {product.name}
              </h3>

              {/* Price */}
              <div>
                <p className="text-sm text-stone-500 font-medium mb-0.5">{t("price")}</p>
                <p className="font-black text-2xl text-stone-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-transparent text-xs font-semibold text-stone-600 border-stone-200 rounded-full px-3 py-1">
                  {(() => {
                    const cat = categories?.find(c => c.slug === product.category || c.name === product.category);
                    if (cat && locale === 'ar') return cat.name_ar || cat.name;
                    return cat ? cat.name : product.category;
                  })()}
                </Badge>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-2 flex gap-3">
                <Button
                  variant="outline"
                  className="shrink-0 h-12 w-12 rounded-xl border-stone-200 text-stone-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors p-0"
                  onClick={() => deleteProduct.mutate({ id: product.id })}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
                
                <EditProductModal product={product} onUpdated={() => { refetch(); onUpdated?.(); }} />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default ProductTabBody;
