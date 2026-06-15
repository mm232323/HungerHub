import { LucideIcon } from "lucide-react";

export interface FormData {
  name: string;
  bio: string;
  cuisineType: string;
  tags: string[];
  deliveryTime: string;
  deliveryFee: string;
  address: string;
  country: string;
  isOpen: boolean;
  profileImage: string;
  coverImage: string;
  latitude?: number;
  longitude?: number;
}

export interface StepInfo {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
}
