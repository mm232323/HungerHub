'use client'
import {
  Clock,
  MapPin,
  Heart,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const clerkAppearance = {
  layout: {
    socialButtonsPlacement: "top",
    socialButtonsVariant: "blockButton",
  },
  variables: {
    colorPrimary: "#F97316", // Beautiful brand orange accent
    colorBackground: "#FFFFFF", // Light background inside the form
    colorInputBackground: "#FFFFFF",
    colorInputText: "#1F2937",
    colorText: "#1F2937",
    colorTextSecondary: "#4B5563",
    colorDanger: "#EF4444",
    borderRadius: "12px",
    fontFamily: "var(--font-sans), sans-serif",
  },
  elements: {
    rootBox: {
      width: "100%",
      maxWidth: "550px",
      boxShadow: "none",
      border: "none",
      overflow: "visible",
    },
    cardBox: {
      width: "100%",
      boxShadow: "none",
      border: "none",
      overflow: "visible",
    },
    card: {
      backgroundColor: "transparent",
      boxShadow: "none",
      border: "none",
      width: "100%",
      padding: "0px",
      overflow: "visible",
    },
    headerTitle: {
      fontSize: "2.25rem",
      fontWeight: "800",
      letterSpacing: "-0.03em",
      color: "#1F2937",
    },
    headerSubtitle: {
      color: "#4B5563",
      fontSize: "0.95rem",
    },
    socialButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      width: "100%",
    },
    socialButtonsBlockButton: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #E5E7EB",
      color: "#1F2937",
      height: "50px",
      borderRadius: "12px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "#F9FAFB",
        borderColor: "#F97316",
      },
    },
    socialButtonsBlockButtonText: {
      color: "#1F2937",
      fontWeight: "500",
    },
    dividerLine: {
      backgroundColor: "#E5E7EB",
    },
    dividerText: {
      color: "#6B7280",
    },
    formFieldInput: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #D1D5DB",
      color: "#1F2937",
      height: "50px",
      borderRadius: "12px",
      transition: "all 0.2s ease-in-out",
      "&:focus": {
        borderColor: "#F97316",
        boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.15)",
      },
    },
    formFieldLabel: {
      color: "#4B5563",
      fontWeight: "500",
    },
    formButtonPrimary: {
      backgroundColor: "#F97316",
      height: "50px",
      borderRadius: "12px",
      textTransform: "none",
      fontSize: "1.05rem",
      fontWeight: "600",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "#EA580C",
      },
    },
    footerActionText: {
      color: "#4B5563",
    },
    footerActionLink: {
      color: "#F97316",
      fontWeight: "600",
      transition: "all 0.15s ease-in-out",
      "&:hover": {
        color: "#EA580C",
      },
    },
    formFieldCheckboxInput: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #D1D5DB",
      "&:checked": {
        backgroundColor: "#F97316",
        borderColor: "#F97316",
      },
    },
    formFieldCheckboxLabel: {
      color: "#4B5563",
    },
    formFieldInputShowPasswordButton: {
      color: "#6B7280",
      "&:hover": {
        color: "#1F2937",
      },
    },
    footer: {
      "& a": {
        color: "#6B7280 !important",
      },
    },
    clerkLogoImage: {
      opacity: 0.7,
      filter: "grayscale(1)",
    },
  },
} as const;

export const getClerkLocalization = (t: any) => ({
  signUp: {
    start: {
      title: t("signUpTitle") || "Create your account",
      subtitle: t("signUpSubtitle") || "Welcome! Please fill in the details to get started.",
      actionText: t("alreadyHaveAccount") || "Already have an account?",
      actionLink: t("signIn") || "Sign In",
    },
  },
  signIn: {
    start: {
      title: t("signInTitle") || "Sign in to your account",
      subtitle: t("signInSubtitle") || "Welcome back! Please enter your details.",
      actionText: t("dontHaveAccount") || "Don't have an account?",
      actionLink: t("signUp") || "Sign Up",
    },
  },
  socialButtonsBlockButton: t("socialButtonText") || "Continue with {{provider|titleize}}",
  dividerText: t("or") || "OR",
  formFieldLabel__firstName: t("yourName") || "Your name",
  formFieldLabel__emailAddress: t("emailOrPhone") || "Your E-mail or Phone Number",
  formFieldLabel__emailAddress_username: t("emailOrPhone") || "Your E-mail or Phone Number",
  formFieldLabel__password: t("password") || "Password",
  formFieldLabel__confirmPassword: t("confirmPassword") || "Confirm Password",
  formButtonPrimary: t("submitButton") || "Submit",
});

export const BG_EMOJIS = [
  {
    emoji: "🍕",
    top: "8%",
    left: "5%",
    size: "3rem",
    anim: "auth-float",
    delay: "0s",
    opacity: 0.2,
  },
  {
    emoji: "🍔",
    top: "15%",
    left: "88%",
    size: "2.4rem",
    anim: "auth-float-alt",
    delay: "0.8s",
    opacity: 0.15,
  },
  {
    emoji: "🌮",
    top: "72%",
    left: "4%",
    size: "2.6rem",
    anim: "auth-float-slow",
    delay: "1.2s",
    opacity: 0.18,
  },
  {
    emoji: "🍜",
    top: "78%",
    left: "90%",
    size: "2.2rem",
    anim: "auth-float",
    delay: "0.5s",
    opacity: 0.14,
  },
  {
    emoji: "🍣",
    top: "45%",
    left: "92%",
    size: "1.8rem",
    anim: "auth-float-alt",
    delay: "1.6s",
    opacity: 0.12,
  },
  {
    emoji: "🧁",
    top: "85%",
    left: "48%",
    size: "1.6rem",
    anim: "auth-float-slow",
    delay: "2s",
    opacity: 0.12,
  },
  {
    emoji: "🥗",
    top: "5%",
    left: "48%",
    size: "1.6rem",
    anim: "auth-float",
    delay: "1.9s",
    opacity: 0.1,
  },
];

export const getCustomerPerks = () => {
  const t = useTranslations("Auth.SignUp");
  return [
    {
      icon: <Clock className="h-4 w-4 text-orange-500" />,
      text: t("perkDelivery"),
    },
    {
      icon: <MapPin className="h-4 w-4 text-orange-500" />,
      text: t("perkTracking"),
    },
    { icon: <Heart className="h-4 w-4 text-orange-500" />, text: t("perkFav") },
  ];
};

export const getMerchantPerks = () => {
  const t = useTranslations("Auth.SignUp");
  return [
    {
      icon: <TrendingUp className="h-4 w-4 text-indigo-400" />,
      text: t("perkAnalytics"),
    },
    {
      icon: <Users className="h-4 w-4 text-indigo-400" />,
      text: t("perkKanban"),
    },
    {
      icon: <BarChart3 className="h-4 w-4 text-indigo-400" />,
      text: t("perkAI"),
    },
  ];
};
