import { Utensils, Truck, Users, Star, Heart, Globe, Award } from "lucide-react";

export const STATS = [
  { value: "8+", label: "Partner Restaurants", icon: Utensils },
  { value: "17", label: "Menu Items", icon: Award },
  { value: "2.4k", label: "Happy Customers", icon: Users },
  { value: "4.9", label: "Avg Rating", icon: Star },
];

export const VALUES = [
  {
    title: "Fresh, Always",
    description: "Every dish on FoodHub is made with fresh ingredients sourced from local suppliers. No shortcuts, no compromises.",
    icon: Heart,
    color: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-500 text-white",
  },
  {
    title: "Community First",
    description: "We champion independent restaurants and local food creators, giving them the digital tools they need to thrive.",
    icon: Users,
    color: "bg-stone-50 border-stone-100",
    iconBg: "bg-stone-800 text-white",
  },
  {
    title: "Speed & Simplicity",
    description: "Order in seconds. Track in real time. Hot food at your door — that's the promise.",
    icon: Truck,
    color: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-500 text-white",
  },
  {
    title: "Built for Everyone",
    description: "Whether you're a hungry customer or a restaurant owner, FoodHub is designed to make your life easier.",
    icon: Globe,
    color: "bg-stone-50 border-stone-100",
    iconBg: "bg-stone-800 text-white",
  },
];