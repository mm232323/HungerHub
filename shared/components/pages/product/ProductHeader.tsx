import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { ChevronLeft } from "lucide-react";
import { Product } from "@/types";

function ProductHeader({ product }: { product: Product }) {
  return (
    <>
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-muted rounded-b-[2rem] overflow-hidden shadow-sm">
        <div className="absolute top-4 left-4 z-10">
          <Link href={`/merchant/${(product as any).merchantSlug || product.merchantId}`}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-md bg-background/80 backdrop-blur-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
}

export default ProductHeader;
