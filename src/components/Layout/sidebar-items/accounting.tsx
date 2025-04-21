
import { CreditCard, Book, RefreshCw, BarChart2, DollarSign, Settings } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const accountingSection: SidebarItem = {
  title: "Accounting",
  icon: <CreditCard />,
  children: [
    { title: "Chart of Accounts", path: "/accounting/chart-of-accounts", icon: <Book /> },
    { title: "Journal Entries", path: "/accounting/journal", icon: <Book /> },
    { title: "Reconciliation", path: "/accounting/reconciliation", icon: <RefreshCw /> },
    { title: "Bank Accounts", path: "/accounting/bank-accounts", icon: <CreditCard /> },
    { title: "Trial Balance", path: "/accounting/trial-balance", icon: <BarChart2 /> },
    { title: "Profit & Loss", path: "/accounting/profit-loss", icon: <DollarSign /> },
    { title: "Cash Flow", path: "/accounting/cash-flow", icon: <CreditCard /> },
    { title: "Tax Settings", path: "/accounting/tax-settings", icon: <Settings /> },
  ],
};
