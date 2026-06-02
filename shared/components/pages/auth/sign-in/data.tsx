export const clerkAppearance = {
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
      maxWidth: "440px",
      boxShadow: "none",
      border: "none",
    },
    cardBox: {
      boxShadow: "none",
      border: "none",
    },
    card: {
      backgroundColor: "transparent",
      boxShadow: "none",
      border: "none",
      width: "100%",
      padding: "0px",
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
    socialButtonsBlockButton: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #E5E7EB",
      color: "#1F2937",
      height: "50px",
      borderRadius: "12px",
      transition: "all 0.2s ease-in-out",
      '&:hover': {
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
      '&:focus': {
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
      '&:hover': {
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
      '&:hover': {
        color: "#EA580C",
      },
    },
    formFieldCheckboxInput: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #D1D5DB",
      '&:checked': {
        backgroundColor: "#F97316",
        borderColor: "#F97316",
      },
    },
    formFieldCheckboxLabel: {
      color: "#4B5563",
    },
    formFieldInputShowPasswordButton: {
      color: "#6B7280",
      '&:hover': {
        color: "#1F2937",
      },
    },
    footer: {
      '& a': {
        color: "#6B7280 !important",
      },
    },
    clerkLogoImage: {
      opacity: 0.7,
      filter: "grayscale(1)",
    },
  },
} as const;


export const FOOD_EMOJIS = [
  { emoji: "🍕", top: "12%", left: "14%", size: "3.2rem", anim: "auth-float", delay: "0s", opacity: 0.85 },
  { emoji: "🍔", top: "8%", left: "72%", size: "2.6rem", anim: "auth-float-alt", delay: "0.6s", opacity: 0.75 },
  { emoji: "🌮", top: "62%", left: "6%", size: "2.8rem", anim: "auth-float-slow", delay: "1s", opacity: 0.8 },
  { emoji: "🍜", top: "78%", left: "78%", size: "2.4rem", anim: "auth-float", delay: "1.4s", opacity: 0.7 },
  { emoji: "🍣", top: "38%", left: "80%", size: "2rem", anim: "auth-float-alt", delay: "0.3s", opacity: 0.6 },
  { emoji: "🥗", top: "50%", left: "3%", size: "1.8rem", anim: "auth-float-slow", delay: "1.8s", opacity: 0.55 },
  { emoji: "🧁", top: "88%", left: "38%", size: "2rem", anim: "auth-float", delay: "0.9s", opacity: 0.65 },
  { emoji: "🍦", top: "22%", left: "44%", size: "1.6rem", anim: "auth-float-alt", delay: "2.1s", opacity: 0.5 },
];
