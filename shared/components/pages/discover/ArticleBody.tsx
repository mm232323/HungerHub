import React from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FeedPost } from "@/types";
import { useTranslations } from "next-intl";

function ArticleBody({ post }: { post: FeedPost }) {
  const t = useTranslations("DiscoverPage");

  return (
    <div className="aspect-[4/5] bg-muted relative">
      <img
        src={post.image}
        alt={post.caption}
        className="w-full h-full object-cover"
      />
      {post.productId && (
        <div className="absolute bottom-4 left-4 right-4">
          <Link href={`/product/${post.productId}`}>
            <div className="bg-background/95 backdrop-blur-md border rounded-[16px] p-2 flex items-center justify-between shadow-xl hover:bg-background transition-colors group">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-muted overflow-hidden border shadow-sm">
                  <img
                    src={(post.product as { image?: string })?.image || ""}
                    alt={(post.product as { name?: string })?.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">
                    {(post.product as { name?: string })?.name ||
                      t("featuredItem")}
                  </p>
                  <p className="text-xs font-semibold text-orange-500">
                    $
                    {(post.product as { price?: number })?.price?.toFixed(2) ||
                      "0.00"}
                  </p>
                </div>
              </div>
              <Button size="sm" className="rounded-full h-8 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold mr-1">
                <Plus className="h-4 w-4 mr-1" /> {t("addBtn")}
              </Button>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ArticleBody;
