import { Product } from '@/types'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ProductContent({product}: {product: Product}) {
  return  <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="text-2xl font-bold text-primary">
              ${(product.discountPrice || product.price).toFixed(2)}
            </div>
          </div>
          {product.discountPrice && (
            <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
          )}

          <Link href={`/merchant/${(product as any).merchantSlug || product.merchantId}`} className="inline-block text-sm font-medium text-muted-foreground hover:text-primary">
            By {product.merchantName || 'Merchant'}
          </Link>
        </div>

        {product.rating && (
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
        )}

        <div className="space-y-3 pt-4 border-t">
          <h3 className="font-semibold text-lg">Details</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {product.ingredients && product.ingredients.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ing => (
                <span key={ing} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.nutritionalInfo && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">Nutritional Info</h3>
            <p className="text-sm text-muted-foreground">{product.nutritionalInfo}</p>
          </div>
        )}
      </div>
}

export default ProductContent