import { FeedPost } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

function ArticleComments({ post, comments = [] }: { post: FeedPost; comments?: { content: string; id: number, sessionId: string }[] }) {
  const t = useTranslations("DiscoverPage");
  
  return (
    <div className="px-4 space-y-2">
      <p className="text-sm leading-relaxed mb-3">
        <span className="font-bold mr-2 text-foreground">{post.merchant.name}</span>
        <span className="text-foreground/90">{post.caption}</span>
      </p>
      
      {comments.length > 0 && (
        <div className="pt-2 space-y-3 border-t">
          {comments.map((comment: any) => (
            <div key={comment.id} className="flex gap-2 items-start">
              {comment.user?.imageUrl ? (
                <img src={comment.user.imageUrl} alt={comment.user.name} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">
                    {comment.user?.name ? comment.user.name.substring(0, 2).toUpperCase() : comment.sessionId.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 bg-muted/30 rounded-2xl px-3 py-2">
                <p className="text-xs font-semibold mb-0.5 text-foreground">
                  {comment.user?.name || `User ${comment.sessionId.substring(0, 4)}`}
                </p>
                <p className="text-sm text-foreground/90">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleComments;
