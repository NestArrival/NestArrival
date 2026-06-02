export interface SubscriptionPlan {
  id: string;
  name: string;
  priceOneTime: number;
  priceSub: number;
  durationDays: number;
  approachesLimit: number; // -1 for unlimited
  isFeatured: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "plan-1",
    name: "Standard 14-Day",
    priceOneTime: 29,
    priceSub: 19,
    durationDays: 14,
    approachesLimit: 5,
    isFeatured: false,
  },
  {
    id: "plan-2",
    name: "Premium 30-Day",
    priceOneTime: 39,
    priceSub: 29,
    durationDays: 30,
    approachesLimit: 15,
    isFeatured: false,
  },
  {
    id: "plan-3",
    name: "Professional 45-Day",
    priceOneTime: 69,
    priceSub: 49,
    durationDays: 45,
    approachesLimit: 30,
    isFeatured: false,
  },
  {
    id: "plan-featured",
    name: "Featured Elite",
    priceOneTime: 89,
    priceSub: 79,
    durationDays: 60, // Let's make elite plan 60 days
    approachesLimit: -1, // Unlimited
    isFeatured: true,
  },
];

export const URGENT_MATCH_ADDON = {
  id: "urgent-match",
  name: "Urgent Housing Match",
  price: 99,
  description: "Priority profile placement, featured listings layout, and accelerated match matching workflow.",
};

export const DEFAULT_ADMIN_CREDENTIALS = {
  email: "admin@nestarrival.ca",
  password: "NestArrivalAdmin2026!",
  fullName: "NestArrival Administrator",
};

export const APP_CONFIG = {
  otpExpiryMinutes: 15,
  jwtSecret: process.env.JWT_SECRET || "nestarrival-secure-session-key-2026-xyz",
  jwtCookieName: "nestarrival_session",
  refundEligibleIfNoOwnerResponse: true,
};
