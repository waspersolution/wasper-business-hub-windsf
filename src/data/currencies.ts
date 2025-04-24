
export const currencies = [
  { code: "NGN", name: "Nigerian Naira" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "ZAR", name: "South African Rand" },
  { code: "AED", name: "UAE Dirham" }
] as const;

export type CurrencyCode = typeof currencies[number]["code"];
