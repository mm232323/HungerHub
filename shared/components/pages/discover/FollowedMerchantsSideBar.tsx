"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Merchant } from "@/types";
import { Button } from "@/components/ui/button";
import { CheckCircle2, UserPlus } from "lucide-react";
import { useFollowMerchant } from "@/apis/merchants";
import { useTranslations } from "next-intl";

function MerchantListItem({ merchant }: { merchant: Merchant }) {
  const tGlobal = useTranslations("Global");
  const [isFollowing, setIsFollowing] = useState(true);
  const followMutation = useFollowMerchant({
    mutation: {
      onSuccess: (data) => {
        setIsFollowing(data.isFollowing);
      }
    }
  });

  return (
    <div className="flex items-center justify-between group">
      <Link
        href={`/merchant/${merchant.slug || merchant.id}`}
        className="flex items-center gap-3 flex-1 overflow-hidden"
      >
        <Avatar className="h-10 w-10 border shrink-0">
          <AvatarImage
            src={merchant.profileImage}
            alt={merchant.name}
            className="object-cover"
          />
          <AvatarFallback>
            {merchant.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <h4 className="font-semibold text-sm truncate group-hover:underline">
            {merchant.name}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {merchant.cuisineType || "Restaurant"}
          </p>
        </div>
      </Link>
      <Button
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        onClick={() => followMutation.mutate({ id: merchant.id })}
        disabled={followMutation.isPending}
        className={`ml-2 h-7 px-2 text-xs rounded-full font-medium transition-colors ${
          isFollowing 
            ? "border-primary/20 hover:bg-primary hover:text-primary-foreground" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        <span className="flex items-center gap-1">
          {isFollowing ? (
            <>
              <CheckCircle2 className="h-3 w-3" /> {tGlobal("following")}
            </>
          ) : (
            <>
              <UserPlus className="h-3 w-3" /> {tGlobal("follow")}
            </>
          )}
        </span>
      </Button>
    </div>
  );
}

export function FollowedMerchantsSideBar({
  merchants,
}: {
  merchants: Merchant[];
}) {
  const tGlobal = useTranslations("Global");
  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm sticky top-24">
      <h3 className="font-bold text-lg mb-4">{tGlobal("followingTitle")}</h3>
      {merchants.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          {tGlobal("noFollowingStores")}
        </p>
      ) : (
        <div className="space-y-4">
          {merchants.map((merchant) => (
            <MerchantListItem key={merchant.id} merchant={merchant} />
          ))}
        </div>
      )}
    </div>
  );
}
