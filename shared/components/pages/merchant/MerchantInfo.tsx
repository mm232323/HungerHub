import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Check, Clock, MapPin, Star } from "lucide-react";
import { Merchant } from "@/types";
import { useFollowMerchant } from "@/apis";
import { useToast } from "@/hooks/use-toast";
import { useAuth, SignInButton } from "@clerk/nextjs";

function MerchantInfo({
  merchant,
  merchantId,
  onHandleFollows,
}: {
  merchant: Merchant;
  merchantId: number;
  onHandleFollows: (isFollowing: boolean, followersCount: number) => void;
}) {
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const followMutation = useFollowMerchant({
    mutation: {
      onSuccess: (data) => {
        toast({ title: "Follow updated" });
        onHandleFollows(data.isFollowing, data.followersCount);
      },
    },
  });
  return (
    <div className="bg-card border rounded-3xl p-6 shadow-xl relative">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <Avatar className="h-24 w-24 border-4 border-card -mt-16 md:mt-0 bg-muted">
          <AvatarImage src={merchant.profileImage} />
          <AvatarFallback>{merchant.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{merchant.name}</h1>
            {isSignedIn ? (
              <Button
                variant={merchant.isFollowing ? "secondary" : "default"}
                className="rounded-full"
                onClick={() => followMutation.mutate({ id: merchantId })}
              >
                {merchant.isFollowing ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Following
                  </>
                ) : (
                  "Follow"
                )}
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="rounded-full">
                  Follow
                </Button>
              </SignInButton>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {merchant.cuisineType} • {merchant.followersCount} followers
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-medium pt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{merchant.rating?.toFixed(1) || "New"}</span>
              <span className="text-muted-foreground">
                ({merchant.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{merchant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{merchant.address || "Local Delivery"}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-card-foreground/80">{merchant.bio}</p>
    </div>
  );
}

export default MerchantInfo;
