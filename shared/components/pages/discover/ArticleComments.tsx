import { FeedPost } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

function ArticleComments({ post }: { post: FeedPost }) {
  const t = useTranslations("DiscoverPage");
  return (
    <div className="px-4 space-y-2">
      <p className="font-semibold text-sm">
        {post.likes.toLocaleString()} {t("likesText")}
      </p>
      <p className="text-sm">
        <span className="font-semibold mr-2">{post.merchant.name}</span>
        {post.caption}
      </p>
      {post.comments && post.comments > 0 && (
        <p className="text-muted-foreground text-sm cursor-pointer">
          {t("viewAll")} {post.comments} {t("commentsText")}
        </p>
      )}
    </div>
  );
}

export default ArticleComments;
