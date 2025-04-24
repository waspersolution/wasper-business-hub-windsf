
export const timezones = [
  { value: "Africa/Lagos", label: "Lagos (GMT+1)" },
  { value: "Africa/Cairo", label: "Cairo (GMT+2)" },
  { value: "Africa/Nairobi", label: "Nairobi (GMT+3)" },
  { value: "Africa/Johannesburg", label: "Johannesburg (GMT+2)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "America/New_York", label: "New York (GMT-5)" },
  { value: "Asia/Dubai", label: "Dubai (GMT+4)" }
] as const;

export type Timezone = typeof timezones[number]["value"];
