import { Link, MoreHorizontal } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { FeedPost } from "@/types";
import { Button } from "../../ui/button";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

function ArticleTop({ post }: { post: FeedPost }) {
  return (
    <div className="px-4 flex items-center justify-between">
      <Link
        href={`/merchant/${post.merchantId}`}
        className="flex items-center gap-3"
      >
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={post.merchant.profileImage}
            alt={post.merchant.name}
          />
          <AvatarFallback>{post.merchant.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-sm">{post.merchant.name}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </Link>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
}

export default ArticleTop;
