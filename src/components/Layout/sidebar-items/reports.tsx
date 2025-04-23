
import { BarChart2, Box, BarChart, TrendingUp, DollarSign, Archive, ShoppingCart, Calendar, Users, User, Book, Layers, Layout, Save } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const reportsSection: SidebarItem = {
  title: "Reports",
  icon: <BarChart2 />,
  children: [
    { title: "Reports Dashboard", path: "/reports", icon: <BarChart2 /> },
    {
      title: "Stock Reports",
      icon: <Box />,
      children: [
        { title: "Stock Summary", path: "/reports/stock", icon: <BarChart /> },
        { title: "Stock Movement", path: "/reports/stock-movement", icon: <TrendingUp /> },
        { title: "Valuation Report", path: "/reports/valuation", icon: <DollarSign /> },
        { title: "Dead Stock", path: "/reports/dead-stock", icon: <Archive /> },
      ]
    },
    {
      title: "Sales Reports",
      icon: <ShoppingCart />,
      children: [
        { title: "Sales Summary", path: "/reports/sales", icon: <BarChart /> },
        { title: "Daily/Weekly/Monthly Sales", path: "/reports/sales-periods", icon: <Calendar /> },
        { title: "Top Selling Products", path: "/reports/top-products", icon: <TrendingUp /> },
        { title: "Customer Sales Summary", path: "/reports/customer-summary", icon: <Users /> },
      ]
    },
    {
      title: "Purchase Reports",
      icon: <Archive />,
      children: [
        { title: "Purchase Summary", path: "/reports/purchase-summary", icon: <BarChart /> },
        { title: "Supplier-wise Purchases", path: "/reports/supplier-purchases", icon: <User /> },
      ]
    },
    {
      title: "Financial Reports",
      icon: <Book />,
      children: [
        { title: "Financial Overview", path: "/reports/financials", icon: <BarChart /> },
        { title: "Trial Balance", path: "/reports/trial-balance", icon: <BarChart /> },
        { title: "Profit & Loss", path: "/reports/profit-loss", icon: <DollarSign /> },
        { title: "Balance Sheet", path: "/reports/balance-sheet", icon: <Layers /> },
        { title: "Cash Flow", path: "/reports/cash-flow", icon: <TrendingUp /> },
        { title: "Journal Report", path: "/reports/journal", icon: <Book /> },
      ]
    },
    { title: "Custom Reports", path: "/reports/custom", icon: <Layout /> },
    { title: "Saved Reports", path: "/reports/saved", icon: <Save /> },
  ],
};
