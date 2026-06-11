import { Store, ChefHat, Clock, Image } from "lucide-react";
import { StepInfo, FormData } from "./types";

export const CUISINE_TYPES = [
  { label: "Burgers", icon: "🍔" },
  { label: "Pizza", icon: "🍕" },
  { label: "Sushi", icon: "🍱" },
  { label: "Tacos", icon: "🌮" },
  { label: "Healthy", icon: "🥗" },
  { label: "Desserts", icon: "🍰" },
  { label: "Coffee", icon: "☕" },
  { label: "Homemade", icon: "🏠" },
  { label: "BBQ", icon: "🔥" },
  { label: "Asian", icon: "🍜" },
  { label: "Italian", icon: "🍝" },
  { label: "Seafood", icon: "🦞" },
  { label: "Vegan", icon: "🌱" },
  { label: "Breakfast", icon: "🍳" },
];

export const DELIVERY_TIMES = [
  "10-20 min",
  "20-30 min",
  "25-35 min",
  "30-45 min",
  "45-60 min",
];

export const getSteps = (t: any): StepInfo[] => [
  {
    id: 1,
    title: t("step1.title"),
    icon: Store,
    description: t("step1.desc"),
  },
  {
    id: 2,
    title: t("step2.title"),
    icon: ChefHat,
    description: t("step2.desc"),
  },
  {
    id: 3,
    title: t("step3.title"),
    icon: Clock,
    description: t("step3.desc"),
  },
  {
    id: 4,
    title: t("step4.title"),
    icon: Image,
    description: t("step4.desc"),
  },
];

export const INITIAL_FORM: FormData = {
  name: "",
  bio: "",
  cuisineType: "",
  tags: [],
  deliveryTime: "25-35 min",
  deliveryFee: "2.99",
  address: "",
  country: "",
  isOpen: true,
  profileImage: "",
  coverImage: "",
};
