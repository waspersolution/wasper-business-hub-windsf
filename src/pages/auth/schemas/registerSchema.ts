
import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  fiscalYearStart: z.date({
    required_error: "Fiscal year start date is required",
  }),
  accountingStart: z.date({
    required_error: "Accounting start date is required",
  }),
  currency: z.string({
    required_error: "Please select a base currency",
  }),
  timezone: z.string({
    required_error: "Please select a time zone",
  }),
  logo: z.any().optional(),
}).refine((data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return data.fiscalYearStart <= today;
}, {
  message: "Fiscal year start date must not be in the future",
  path: ["fiscalYearStart"],
}).refine((data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return data.accountingStart <= today;
}, {
  message: "Accounting start date must not be in the future",
  path: ["accountingStart"],
}).refine((data) => {
  return data.fiscalYearStart <= data.accountingStart;
}, {
  message: "Fiscal year start must be on or before accounting start date",
  path: ["fiscalYearStart"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
