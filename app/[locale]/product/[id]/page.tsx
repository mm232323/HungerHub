import type { Metadata } from "next";
import { getProductById, getProductReviews } from "@/lib/server-api";
import { ProductDetailView } from "@/shared/components/pages/product/product-detail-view";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(parseInt(id, 10));
  return {
    title: product
      ? `${product.name} - HungerHub`
      : "Product Details - HungerHub",
    description:
      "View ingredients, nutritional details, prices and add directly to your cart.",
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const [product, reviews] = await Promise.all([
    getProductById(productId),
    getProductReviews(productId),
  ]);
  
  if (!product) {
    return <div className="p-4 text-center">Product not found</div>;
  }
  return <ProductDetailView product={product} initialReviews={reviews} />;
}
