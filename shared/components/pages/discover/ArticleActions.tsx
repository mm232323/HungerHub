import React from "react";
import { Button } from "../../ui/button";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { FeedPost } from "@/types";
import { useLikeFeedPost, useSaveFeedPost } from "@/apis";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

function ArticleActions({ post, setFeed }: { post: FeedPost; setFeed: React.Dispatch<React.SetStateAction<FeedPost[]>> }) {
  const t = useTranslations("DiscoverPage");

  const likeMutation = useLikeFeedPost({
    mutation: {
      onSuccess: (data, { id }) => {
        toast({ title: t("toastLiked") });
        setFeed((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, isLiked: data.isLiked, likes: data.likes }
              : p,
          ),
        );
      },
    },
  });
  const saveMutation = useSaveFeedPost({
    mutation: {
      onSuccess: (data, { id }) => {
        toast({ title: t("toastSaved") });
        setFeed((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isSaved: data.isSaved } : p)),
        );
      },
    },
  });
  return (
    <div className="px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={`hover:text-primary ${post.isLiked ? "text-primary" : ""}`}
          onClick={() => likeMutation.mutate({ id: post.id })}
        >
          <Heart className={`h-6 w-6 ${post.isLiked ? "fill-current" : ""}`} />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-6 w-6" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => saveMutation.mutate({ id: post.id })}
      >
        <Bookmark className={`h-6 w-6 ${post.isSaved ? "fill-current" : ""}`} />
      </Button>
    </div>
  );
}

export default ArticleActions;
