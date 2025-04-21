
import { DollarSign, CreditCard, ClipboardList } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const billingSection: SidebarItem = {
  title: "Billing",
  icon: <DollarSign />,
  children: [
    { title: "Subscription Plans", path: "/billing/subscription", icon: <CreditCard /> },
    { title: "Payment History", path: "/billing/history", icon: <ClipboardList /> },
    { title: "Upgrade Plan", path: "/billing/upgrade", icon: <CreditCard /> },
  ],
};
