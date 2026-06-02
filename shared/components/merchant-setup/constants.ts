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

export const STEPS: StepInfo[] = [
  {
    id: 1,
    title: "Your Restaurant",
    icon: Store,
    description: "Tell us about your place",
  },
  {
    id: 2,
    title: "Menu & Style",
    icon: ChefHat,
    description: "What do you serve?",
  },
  {
    id: 3,
    title: "Delivery Setup",
    icon: Clock,
    description: "Set your delivery info",
  },
  {
    id: 4,
    title: "Make It Yours",
    icon: Image,
    description: "Add photos & branding",
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
  isOpen: true,
  profileImage: "",
  coverImage: "",
};
