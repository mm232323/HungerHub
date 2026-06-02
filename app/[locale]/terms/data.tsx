import {
  Scale,
  Truck,
  CreditCard,
  Ban,
  AlertTriangle,
  Gavel,
} from "lucide-react";

export const SECTIONS = [
  {
    icon: Scale,
    title: "Acceptance of Terms",
    content: `By accessing or using FoodHub, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform. We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the revised terms.`,
  },
  {
    icon: Truck,
    title: "Orders & Delivery",
    content: `All orders placed through FoodHub are subject to restaurant availability and delivery partner capacity. Estimated delivery times are provided for convenience and may vary due to traffic, weather, or operational delays. FoodHub is not liable for delays outside our reasonable control.`,
  },
  {
    icon: CreditCard,
    title: "Payments & Refunds",
    content: `Payments are processed securely through our payment partners. Prices listed include applicable taxes where required. Refunds may be issued for incorrect orders, missing items, or food quality issues, subject to review. Refund requests must be submitted within 24 hours of delivery.`,
  },
  {
    icon: Ban,
    title: "Prohibited Conduct",
    content: `Users may not use FoodHub for fraudulent purposes, harassment, or illegal activities. Merchants must provide accurate menu information and comply with all food safety regulations. We reserve the right to suspend or terminate accounts that violate these rules.`,
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: `FoodHub provides the platform on an "as is" basis. We do not guarantee uninterrupted service or specific delivery times. Our liability is limited to the amount paid for the disputed transaction, except where prohibited by law. We are not responsible for the quality of food prepared by independent restaurants.`,
  },
  {
    icon: Gavel,
    title: "Dispute Resolution",
    content: `Any dispute arising from these terms or your use of FoodHub shall first be attempted to be resolved informally. If unresolved, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by applicable law.`,
  },
];
