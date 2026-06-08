export * from "./layout";
export * from "./auth";
export * from "./chart";
export * from "./models";
export * from "./http-client";
export * from "./api-fetch";


export interface FeedAd {
  id: string;
  merchantId: number;
  title: string;
  description: string;
  img: string;
  providedProduct?: number | null;
  isActive?: boolean | null;
  createdAt?: string | null;
  merchant?: {
    id: number;
    name: string;
    slug: string;
    profileImage: string;
  } | null;
}

