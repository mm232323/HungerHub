import React from "react";
import { Button } from "../../ui/button";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { FeedPost } from "@/types";
import { useLikeFeedPost, useSaveFeedPost } from "@/apis";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useAuth } from "@clerk/nextjs";

function ArticleActions({ post, setFeed, onCommentClick, onAuthRequired }: { post: FeedPost; setFeed: React.Dispatch<React.SetStateAction<FeedPost[]>>; onCommentClick?: () => void; onAuthRequired?: () => void }) {
  const t = useTranslations("DiscoverPage");
  const toastT = useTranslations("Toasts");
  const { isSignedIn } = useAuth();

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
  const [isSharing, setIsSharing] = React.useState(false);

  const handleLike = () => {
    if (!isSignedIn) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    likeMutation.mutate({ id: post.id });
  };

  const handleComment = () => {
    if (!isSignedIn) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    if (onCommentClick) onCommentClick();
  };

  const handleSave = () => {
    if (!isSignedIn) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    saveMutation.mutate({ id: post.id });
  };

  return (
    <div className="px-4 flex items-center justify-between">
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          className={`hover:bg-primary/10 rounded-full gap-2 transition-colors ${post.isLiked ? "text-primary hover:text-primary" : "text-muted-foreground"}`}
          onClick={handleLike}
        >
          <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current text-primary" : ""}`} />
          <span className="font-semibold text-sm">{post.likes.toLocaleString()}</span>
        </Button>
        <Button 
          variant="ghost" 
          className="hover:bg-muted rounded-full gap-2 text-muted-foreground transition-colors"
          onClick={handleComment}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold text-sm hidden sm:inline">{t("commentsText")}</span>
          <span className="font-semibold text-sm sm:hidden">{post.comments || 0}</span>
        </Button>
        <Button 
          variant="ghost" 
          className="hover:bg-muted rounded-full gap-2 text-muted-foreground transition-colors"
          disabled={isSharing}
          onClick={async () => {
            if (navigator.share) {
              try {
                setIsSharing(true);
                await navigator.share({
                  title: post.merchant.name,
                  text: post.caption,
                  url: window.location.href,
                });
              } catch (err: any) {
                if (err.name !== 'AbortError') {
                  console.error("Error sharing:", err);
                }
              } finally {
                setIsSharing(false);
              }
            } else {
              toast({ title: toastT("shareNotSupported") });
            }
          }}
        >
          <Share2 className="h-5 w-5" />
          <span className="font-semibold text-sm hidden sm:inline">Share</span>
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-muted text-muted-foreground transition-colors"
        onClick={handleSave}
      >
        <Bookmark className={`h-5 w-5 ${post.isSaved ? "fill-current text-foreground" : ""}`} />
      </Button>
    </div>
  );
}

export default ArticleActions;
