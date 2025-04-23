
import { CreditCard, Book, RefreshCw, BarChart2, DollarSign, Settings, TrendingUp, Layers } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const accountingSection: SidebarItem = {
  title: "Accounting",
  icon: <CreditCard />,
  children: [
    { title: "Chart of Accounts", path: "/accounting/chart-of-accounts", icon: <Book /> },
    { title: "Journal Entries", path: "/accounting/journal", icon: <Book /> },
    { title: "Reconciliation", path: "/accounting/reconciliation", icon: <RefreshCw /> },
    { title: "Bank Accounts", path: "/accounting/bank-accounts", icon: <CreditCard /> },
    { 
      title: "Financial Reports",
      icon: <BarChart2 />,
      children: [
        { title: "Trial Balance", path: "/reports/trial-balance", icon: <BarChart2 /> },
        { title: "Profit & Loss", path: "/reports/profit-loss", icon: <DollarSign /> },
        { title: "Balance Sheet", path: "/reports/balance-sheet", icon: <Layers /> },
        { title: "Cash Flow", path: "/reports/cash-flow", icon: <TrendingUp /> }
      ]
    },
    { title: "Tax Settings", path: "/accounting/tax-settings", icon: <Settings /> },
  ],
};
