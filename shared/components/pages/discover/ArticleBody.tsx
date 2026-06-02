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
            <div className="bg-background/90 backdrop-blur border rounded-xl p-3 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                  <img
                    src={(post.product as { image?: string })?.image || ""}
                    alt={(post.product as { name?: string })?.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {(post.product as { name?: string })?.name ||
                      t("featuredItem")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    $
                    {(post.product as { price?: number })?.price?.toFixed(2) ||
                      "0.00"}
                  </p>
                </div>
              </div>
              <Button size="sm" className="rounded-full h-8">
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
