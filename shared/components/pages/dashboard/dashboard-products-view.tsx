"use client";

import { useState } from "react";
import { useGetDashboardProducts, useDeleteProduct, useCreateProduct } from "@/apis/dashboard";
import { useListCategories } from "@/apis/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/alerts/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/alerts/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Trash2, CheckCircle2, Utensils, Image as ImageIcon, UploadCloud, Link as LinkIcon, Facebook, Instagram, Clock, Tag, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DashboardProductsView() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");
  const [customizations, setCustomizations] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");

  const { data: products, isLoading, refetch } = useGetDashboardProducts({
    query: { queryKey: ["/dashboard/products"] }
  });

  const { data: categories } = useListCategories({
    query: { queryKey: ["/categories"] }
  });

  const deleteProduct = useDeleteProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: "Product deleted" });
        refetch();
      }
    }
  });

  const createProduct = useCreateProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: "Product added successfully!" });
        setIsAddOpen(false);
        refetch();
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setCategory("");
        setPreparationTime("");
        setDietaryTags("");
        setCustomizations("");
        setFacebookUrl("");
        setInstagramUrl("");
      },
      onError: (err: any) => {
        toast({ title: "Error adding product", description: err.message, variant: "destructive" });
      }
    }
  });

  const handleSaveProduct = () => {
    if (!name || !price || !category) {
      toast({ title: "Missing required fields", variant: "destructive" });
      return;
    }

    createProduct.mutate({
      data: {
        name,
        description,
        price: Number(price),
        image: image || "https://placehold.co/600x400?text=New+Product",
        category,
        preparationTime: preparationTime ? Number(preparationTime) : null,
        dietaryTags: dietaryTags ? dietaryTags.split(",").map(t => t.trim()) : [],
        customizations: customizations ? customizations.split(",").map(t => t.trim()) : [],
        facebookUrl: facebookUrl || null,
        instagramUrl: instagramUrl || null,
        isAvailable: true,
      }
    });
  };

  // Simple client-side filter
  const filteredProducts = products?.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products Menu</h1>
            <p className="text-muted-foreground mt-1">Manage your items, pricing, and availability.</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
              <DialogHeader className="px-6 py-4 border-b bg-stone-50/50">
                <DialogTitle className="text-xl">Add New Product</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[75vh]">
                <div className="p-6 space-y-8">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Basic Info</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Spicy Chicken Sandwich" className="bg-stone-50/50" />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="A delicious description..." className="resize-none bg-stone-50/50" rows={3} />
                      </div>
                    </div>
                  </div>

                  {/* Image Uploader */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Image</h3>
                      <div className="flex bg-stone-100 p-1 rounded-lg">
                        <button 
                          onClick={() => setUploadMode("file")}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${uploadMode === "file" ? "bg-white shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
                        >
                          Upload
                        </button>
                        <button 
                          onClick={() => setUploadMode("url")}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${uploadMode === "url" ? "bg-white shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
                        >
                          URL Link
                        </button>
                      </div>
                    </div>
                    
                    {uploadMode === "file" ? (
                      <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer group">
                        <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium text-stone-900">Click to upload or drag and drop</p>
                        <p className="text-xs text-stone-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        <p className="text-[10px] text-stone-400 mt-4 italic">Note: File upload is mocked for now, use URL mode to test.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                          <Input value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="pl-9 bg-stone-50/50" />
                        </div>
                        {image && (
                          <div className="mt-4 rounded-xl overflow-hidden border border-stone-200 h-32 w-48 relative bg-stone-100">
                            <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pricing & Category */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Pricing & Category</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="12.99" className="bg-stone-50/50" />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="bg-stone-50/50">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((cat) => (
                              <SelectItem key={cat.id} value={cat.slug}>
                                <div className="flex items-center gap-2">
                                  <span>{cat.icon}</span> {cat.name}
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
                    <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Clock className="h-3 w-3 text-stone-400"/> Prep Time (mins)</Label>
                        <Input value={preparationTime} onChange={e => setPreparationTime(e.target.value)} type="number" placeholder="15" className="bg-stone-50/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Tag className="h-3 w-3 text-stone-400"/> Dietary Tags</Label>
                        <Input value={dietaryTags} onChange={e => setDietaryTags(e.target.value)} placeholder="Vegan, Halal, Spicy (comma separated)" className="bg-stone-50/50" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="flex items-center gap-2"><PlusCircle className="h-3 w-3 text-stone-400"/> Customizations / Add-ons</Label>
                        <Input value={customizations} onChange={e => setCustomizations(e.target.value)} placeholder="Extra Cheese, No Onions (comma separated)" className="bg-stone-50/50" />
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Product Social Links</h3>
                    <div className="grid gap-4">
                      <div className="relative">
                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1877F2]" />
                        <Input value={facebookUrl} onChange={e => setFacebookUrl(e.target.value)} placeholder="Facebook Post or Page URL" className="pl-9 bg-stone-50/50" />
                      </div>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E4405F]" />
                        <Input value={instagramUrl} onChange={e => setInstagramUrl(e.target.value)} placeholder="Instagram Post URL" className="pl-9 bg-stone-50/50" />
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollArea>
              
              <div className="p-4 border-t bg-stone-50 flex justify-end gap-3 rounded-b-lg">
                <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveProduct} disabled={createProduct.isPending}>
                  {createProduct.isPending ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-stone-100 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 bg-stone-50/50 border-stone-200"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm text-stone-500 font-medium ml-auto">
            {filteredProducts.length} items
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border border-stone-100 shadow-sm rounded-2xl">
                <div className="h-48 bg-stone-100 animate-pulse" />
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-stone-500 bg-white rounded-2xl border border-stone-100 border-dashed">
              No products found
            </div>
          ) : filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl flex flex-col group bg-white">
              <div className="relative aspect-[4/3] bg-stone-50 flex items-center justify-center p-6 border-b border-stone-100">
                <div className="absolute top-3 left-3">
                  <div className="h-4 w-4 rounded-[4px] border border-stone-300 bg-white/80 backdrop-blur" />
                </div>
                <img 
                  src={product.image || "https://placehold.co/600x400?text=No+Image"} 
                  alt={product.name} 
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" 
                />
              </div>
              
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50 border border-green-200/50 rounded-full px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1.5 shadow-none">
                    <Utensils className="h-3 w-3" /> 
                    HungerHub
                  </Badge>
                  <div className="flex items-center gap-1 text-xs font-bold text-stone-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-stone-400" /> 
                    {product.isAvailable ? "Active" : "Hidden"}
                  </div>
                </div>

                <h3 className="font-bold text-base text-stone-900 leading-tight line-clamp-2 mb-2 min-h-[40px]">
                  {product.name}
                </h3>
                
                {product.preparationTime && (
                  <p className="text-xs text-stone-500 mb-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {product.preparationTime} mins prep
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-[11px] text-stone-500 font-medium mb-0.5">Price</p>
                    <p className="font-bold text-stone-900">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-stone-500 font-medium mb-0.5">Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Switch 
                        checked={product.isAvailable} 
                        className="scale-75 origin-left"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  <Badge variant="outline" className="bg-stone-50 text-[10px] font-semibold text-stone-600 border-stone-200 rounded-lg px-2">
                    {product.category}
                  </Badge>
                  {product.dietaryTags?.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-stone-50 text-[10px] font-semibold text-stone-600 border-stone-200 rounded-lg px-2">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex gap-2">
                  <Button 
                    variant="outline" 
                    className="shrink-0 w-10 p-0 border-stone-200 text-stone-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    onClick={() => deleteProduct.mutate({ id: product.id })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button className="flex-1 bg-stone-900 text-white hover:bg-stone-800 font-semibold shadow-sm">
                    Edit Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}