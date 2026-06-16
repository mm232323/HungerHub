import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../alerts/dialog'
import { Button } from '../../ui/button'
import { Facebook, Instagram, LinkIcon, Plus, UploadCloud, Clock, Tag, PlusCircle, X } from 'lucide-react'
import { ScrollArea } from '../../ui/scroll-area'
import { toast } from '@/hooks/use-toast'
import { useCreateProduct, useListCategories } from '@/apis'
import { useTranslations, useLocale } from 'next-intl'
import { customFetch } from '@/utils/api'

interface FormData {
  name: string
  description: string
  price: string
  image: string
  category: string
  preparationTime: string
  dietaryTags: string
  customizations: string
  facebookUrl: string
  instagramUrl: string
}

function ProductActionHeader({ onSuccess }: { onSuccess: () => void }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    preparationTime: '',
    dietaryTags: '',
    customizations: '',
    facebookUrl: '',
    instagramUrl: '',
  })

  const [isUploading, setIsUploading] = useState(false)

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      preparationTime: '',
      dietaryTags: '',
      customizations: '',
      facebookUrl: '',
      instagramUrl: '',
    })
  }
    const { data: categories } = useListCategories({
    query: { queryKey: ["/categories"] }
  })
  const t = useTranslations("Dashboard.Products")
  const tSetup = useTranslations("MerchantSetup.Steps.step2")
  const toastT = useTranslations("Toasts")
  const locale = useLocale()

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
  
  const createProduct = useCreateProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: t("addSuccess") || toastT("productUpdated") })
        setIsAddOpen(false)
        onSuccess()
        resetForm()
      },
      onError: (err: any) => {
        toast({ 
          title: t("addErrorTitle") || "Error adding product", 
          description: err?.message || t("addErrorDesc") || "Failed to add product. Please try again.", 
          variant: "destructive" 
        })
      }
    }
  })

  const handleSaveProduct = () => {
    if (!formData.name?.trim() || !formData.price || !formData.category || !formData.description?.trim()) {
      toast({ title: t("missingFields") || toastT("fillFields"), variant: "destructive" })
      return
    }

    createProduct.mutate({
      data: {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        image: formData.image || "https://placehold.co/600x400?text=New+Product",
        category: formData.category,
        preparationTime: formData.preparationTime ? Number(formData.preparationTime) : null,
        dietaryTags: formData.dietaryTags ? formData.dietaryTags.split(",").map(t => t.trim()).filter(t => t) : [],
        customizations: formData.customizations ? formData.customizations.split(",").map(t => t.trim()).filter(t => t) : [],
        facebookUrl: formData.facebookUrl?.trim() || null,
        instagramUrl: formData.instagramUrl?.trim() || null,
        isAvailable: true,
      }
    })
  }
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button><Plus className="h-4 w-4 mr-2" /> {t("addProduct")}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b bg-stone-50/50">
            <DialogTitle className="text-xl">{t("addNewProduct")}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[75vh]">
            <div className="p-6 space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("basicInfo")}</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>{t("nameLabel")}</Label>
                    <Input 
                      value={formData.name} 
                      onChange={e => updateFormData('name', e.target.value)} 
                      placeholder={t("namePlaceholder")} 
                      className="bg-stone-50/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("descLabel")}</Label>
                    <Textarea 
                      value={formData.description} 
                      onChange={e => updateFormData('description', e.target.value)} 
                      placeholder={t("descPlaceholder")} 
                      className="resize-none bg-stone-50/50" 
                      rows={3} 
                    />
                  </div>
                </div>
              </div>

              {/* Image Uploader */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("image")}</h3>
                  <div className="flex bg-stone-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setUploadMode("file")}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${uploadMode === "file" ? "bg-white shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
                    >
                      {t("upload")}
                    </button>
                    <button 
                      onClick={() => setUploadMode("url")}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${uploadMode === "url" ? "bg-white shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
                    >
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
                      <Input 
                        value={formData.image} 
                        onChange={e => updateFormData('image', e.target.value)} 
                        placeholder="https://..." 
                        className="pl-9 bg-stone-50/50" 
                      />
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

              {/* Pricing & Category */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("pricingCategory")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("priceLabel")}</Label>
                    <Input 
                      value={formData.price} 
                      onChange={e => updateFormData('price', e.target.value)} 
                      type="number" 
                      placeholder={t("pricePlaceholder")} 
                      className="bg-stone-50/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("categoryLabel")}</Label>
                    <Select value={formData.category} onValueChange={val => updateFormData('category', val)}>
                      <SelectTrigger className="bg-stone-50/50">
                        <SelectValue placeholder={t("categoryPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 inline-flex items-center justify-center" dangerouslySetInnerHTML={{ __html: cat.icon }} />
                              {locale === 'ar' ? (cat.name_ar || cat.name) : cat.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("details")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Clock className="h-3 w-3 text-stone-400"/> {t("prepTimeLabel")}</Label>
                    <Input 
                      value={formData.preparationTime} 
                      onChange={e => updateFormData('preparationTime', e.target.value)} 
                      type="number" 
                      placeholder={t("prepTimePlaceholder")} 
                      className="bg-stone-50/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Tag className="h-3 w-3 text-stone-400"/> {t("dietaryTagsLabel")} (Max 5)</Label>
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
                    <Label className="flex items-center gap-2"><PlusCircle className="h-3 w-3 text-stone-400"/> {t("customizationsLabel")}</Label>
                    <Input 
                      value={formData.customizations} 
                      onChange={e => updateFormData('customizations', e.target.value)} 
                      placeholder={t("customizationsPlaceholder")} 
                      className="bg-stone-50/50" 
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{t("socialLinks")}</h3>
                <div className="grid gap-4">
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1877F2]" />
                    <Input 
                      value={formData.facebookUrl} 
                      onChange={e => updateFormData('facebookUrl', e.target.value)} 
                      placeholder={t("fbPlaceholder")} 
                      className="pl-9 bg-stone-50/50" 
                    />
                  </div>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E4405F]" />
                    <Input 
                      value={formData.instagramUrl} 
                      onChange={e => updateFormData('instagramUrl', e.target.value)} 
                      placeholder={t("igPlaceholder")} 
                      className="pl-9 bg-stone-50/50" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-stone-50 flex justify-end gap-3 rounded-b-lg">
            <Button variant="ghost" onClick={() => setIsAddOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleSaveProduct} disabled={createProduct.isPending}>
              {createProduct.isPending ? t("saving") : t("saveProduct")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductActionHeader