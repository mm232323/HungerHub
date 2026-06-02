import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { MerchantStory } from "@/types";

function StoriesBar({ initialStories }: { initialStories: MerchantStory[] }) {
  return (
    <div className="px-4 py-4 flex gap-4 overflow-x-auto hide-scrollbar border-b">
      {initialStories.map((story) => (
        <Link
          key={story.id}
          href={`/merchant/${story.merchantId}`}
          className="flex flex-col items-center gap-2 shrink-0 cursor-pointer"
        >
          <div
            className={`p-1 rounded-full ${story.hasUnviewed ? "bg-gradient-to-tr from-primary to-orange-400" : "bg-muted"}`}
          >
            <Avatar className="h-14 w-14 border-2 border-background">
              <AvatarImage
                src={story.merchant.profileImage}
                alt={story.merchant.name}
              />
              <AvatarFallback>
                {story.merchant.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-muted-foreground truncate w-16 text-center">
            {story.merchant.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default StoriesBar;
