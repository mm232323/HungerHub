'use client'
import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useListProducts, useCreateAd, useUpdateAd } from "@/apis";
import { customFetch } from "@/utils/api";
import type { Ad } from "@/apis/ads";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../alerts/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface AdFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  adToEdit?: Ad;
}

export default function AdFormModal({ isOpen, setIsOpen, adToEdit }: AdFormModalProps) {
  const { data: products } = useListProducts();
  const { mutate: createAd, isPending: isCreating } = useCreateAd();
  const { mutate: updateAd, isPending: isUpdating } = useUpdateAd();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      if (adToEdit) {
        setTitle(adToEdit.title);
        setDescription(adToEdit.description);
        setImagePreview(adToEdit.img);
        setSelectedProduct(adToEdit.providedProduct?.toString() || "");
      } else {
        setTitle("");
        setDescription("");
        setImagePreview(null);
        setSelectedProduct("");
      }
    }
  }, [isOpen, adToEdit]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Show instant preview while uploading
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Convert file to base64 data URI
      const toBase64 = (blob: Blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

      const dataUri = await toBase64(file);

      try {
        const json = await customFetch<{ url: string }>('/upload', {
          method: 'POST',
          body: { dataUri, folder: 'ads' },
        });
        if (json && json.url) {
          setImagePreview(json.url); // replace preview with the Cloudinary URL
        } else {
          alert('Upload failed');
        }
      } catch (err) {
        console.error(err);
        alert('Upload error');
      }
    }
  };

  const isPending = isCreating || isUpdating;
  const isEdit = !!adToEdit;

  const handleSubmit = () => {
    const payload = {
      title,
      description,
      img: imagePreview || "https://picsum.photos/400/400",
      providedProduct: selectedProduct ? parseInt(selectedProduct) : null,
    };

    if (isEdit) {
      updateAd(
        { id: adToEdit.id, payload },
        {
          onSuccess: () => {
            setIsOpen(false);
            alert("Ad updated successfully!");
          },
          onError: (error: any) => {
            alert(error.message);
          },
        }
      );
    } else {
      createAd(payload, {
        onSuccess: () => {
          setIsOpen(false);
          alert("Ad created successfully!");
        },
        onError: (error: any) => {
          alert(error.message);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Ad" : "Create New Ad"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 text-foreground">
          {/* Form Side */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ad Title</Label>
              <Input
                placeholder="Enter ad title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter ad description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Ad Image</Label>
              <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-sm">Click to upload image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="space-y-2">
              <Label>Linked Product (Optional)</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select a product...</option>
                {products?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="w-full"
              disabled={isPending || !title || !description}
              onClick={handleSubmit}
            >
              {isPending
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Save Changes"
                : "Launch Ad"}
            </Button>
          </div>

          {/* Preview Side */}
          <div className="hidden md:block">
            <Label className="mb-4 block text-muted-foreground font-semibold uppercase text-xs">
              Live Preview
            </Label>
            <div className="border rounded-xl overflow-hidden shadow-sm bg-background max-w-sm mx-auto">
              {/* Fake Post Header */}
              <div className="p-4 flex items-center gap-3 border-b">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  YR
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight">
                    Your Restaurant
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    Sponsored
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="w-full aspect-square bg-muted flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm flex flex-col items-center gap-2">
                    <Upload className="h-6 w-6 opacity-50" />
                    No image uploaded
                  </span>
                )}
              </div>
              {/* Content */}
              <div className="p-4 space-y-2">
                <h4 className="font-bold text-lg">{title || "Ad Title"}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {description ||
                    "Your ad description will appear here. Write something catchy!"}
                </p>
                <Button variant="secondary" size="sm" className="w-full mt-2 pointer-events-none">
                  View Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
