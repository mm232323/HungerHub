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
  /** @nullable */
  latitude?: number | null;
  /** @nullable */
  longitude?: number | null;
  /** @nullable */
  additionalShowed?: string | null;
  /** @nullable */
  phone?: string | null;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  website?: string | null;
  /** @nullable */
  facebook?: string | null;
  /** @nullable */
  instagram?: string | null;
  /** @nullable */
  twitter?: string | null;
  /** @nullable */
  youtube?: string | null;
  /** @nullable */
  openingHours?: string | null;
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
