import {
  Shield,
  Lock,
  Eye,
  Server,
  Cookie,
  Bell,
  UserCheck,
} from "lucide-react";

export const SECTIONS = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `We collect information you provide directly (name, email, phone, delivery addresses), information about your orders and preferences, device information, and usage data. For merchants, we also collect business details, tax IDs, and bank information for payouts.`,
  },
  {
    icon: Lock,
    title: "How We Use Your Data",
    content: `We use your data to process orders, deliver food, personalize recommendations, improve our services, communicate updates, and ensure platform security. We never sell your personal information to third parties.`,
  },
  {
    icon: Server,
    title: "Data Storage & Security",
    content: `Your data is stored on secure servers with encryption at rest and in transit. We use industry-standard security practices including HTTPS, firewalls, and regular audits. Payment information is handled by PCI-compliant processors — we never store full card details.`,
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    content: `We use cookies and similar technologies to keep you signed in, remember preferences, analyze traffic, and deliver relevant promotions. You can control cookies through your browser settings. Disabling cookies may limit some features.`,
  },
  {
    icon: Bell,
    title: "Communications",
    content: `We may send order confirmations, delivery updates, and promotional emails. You can opt out of marketing communications at any time via your account settings or the unsubscribe link in emails. Transactional messages cannot be disabled.`,
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: `You can access, update, or delete your personal data through your account settings. You may also request a full data export or account deletion by contacting us at hello@foodhub.app. We process requests within 30 days.`,
  },
];
