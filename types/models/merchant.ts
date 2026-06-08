/** Merchant / restaurant profile and listing fields. */
export interface Merchant {
  id: number;
  name: string;
  slug: string;
  coverImage: string;
  profileImage: string;
  bio: string;
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
  cuisineType: string;
  /** @nullable */
  address?: string | null;
  followersCount: number;
  isFollowing: boolean;
  isTrending?: boolean;
  tags?: string[];
}

/** Response from `POST /merchants/:id/follow`. */
export interface FollowStatus {
  isFollowing: boolean;
  followersCount: number;
}

/** Query string for `GET /merchants`. */
export type ListMerchantsParams = {
  category?: string;
  trending?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  owner_user_name?: string;
};
