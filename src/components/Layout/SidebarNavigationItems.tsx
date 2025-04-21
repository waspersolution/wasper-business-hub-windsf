import {
  Box,
  ClipboardList,
  Archive,
  ArrowRight,
  ShoppingCart,
  Bell,
  Users as UsersIcon,
  Package as PackageIcon,
  Book as BookIcon,
  CreditCard,
  DollarSign,
  BarChart2,
  FilePlus,
  File,
  User,
  Tag as TagIcon,
  Calendar,
  Mail as MailIcon,
  Settings,
  Home,
  RefreshCw,
  TrendingUp,
  BarChart,
  PieChart,
  Layout,
  Save,
  Layers,
} from "lucide-react";

export type SidebarItem = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

export const navigationItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home />,
  },
  {
    title: "Inventory",
    icon: <Box />,
    children: [
      { title: "Products", path: "/inventory/products", icon: <Box /> },
      { title: "Stock Adjustments", path: "/inventory/stock-adjustments", icon: <ClipboardList /> },
      { title: "Stock Transfers", path: "/inventory/transfers", icon: <ArrowRight /> },
      { title: "Stock Batches", path: "/inventory/batches", icon: <Archive /> },
      { title: "Reorder Alerts", path: "/inventory/reorder-alerts", icon: <Bell /> },
      { title: "Dead Stock", path: "/reports/dead-stock", icon: <Archive /> },
    ],
  },
  {
    title: "Sales",
    icon: <ShoppingCart />,
    children: [
      { title: "POS (New Sale)", path: "/sales/pos", icon: <ShoppingCart /> },
      { title: "Sales History", path: "/sales/history", icon: <ClipboardList /> },
      { title: "Quotations", path: "/sales/quotations", icon: <File /> },
      { title: "Sales Returns", path: "/sales/returns", icon: <Archive /> },
      { title: "Deliveries", path: "/sales/deliveries", icon: <PackageIcon /> },
      { title: "Customers", path: "/sales/customers", icon: <UsersIcon /> },
      { title: "Customer Groups", path: "/sales/customer-groups", icon: <User /> },
      { title: "Discount Rules", path: "/sales/discounts", icon: <TagIcon /> },
      { title: "Payment Plans", path: "/sales/payment-plans", icon: <CreditCard /> },
    ],
  },
  {
    title: "Purchases",
    icon: <Archive />,
    children: [
      { title: "Purchase Orders", path: "/purchases/orders", icon: <ClipboardList /> },
      { title: "Goods Received Notes", path: "/purchases/goods-received", icon: <PackageIcon /> },
      { title: "Purchase Returns", path: "/purchases/returns", icon: <Archive /> },
      { title: "Suppliers", path: "/purchases/suppliers", icon: <UsersIcon /> },
      { title: "Supplier Groups", path: "/purchases/supplier-groups", icon: <User /> },
      { title: "Purchase Ledger", path: "/purchases/ledger", icon: <CreditCard /> },
    ],
  },
  {
    title: "Accounting",
    icon: <CreditCard />,
    children: [
      { title: "Chart of Accounts", path: "/accounting/chart-of-accounts", icon: <BookIcon /> },
      { title: "Journal Entries", path: "/accounting/journal", icon: <BookIcon /> },
      { title: "Reconciliation", path: "/accounting/reconciliation", icon: <RefreshCw /> },
      { title: "Bank Accounts", path: "/accounting/bank-accounts", icon: <CreditCard /> },
      { title: "Trial Balance", path: "/accounting/trial-balance", icon: <BarChart2 /> },
      { title: "Profit & Loss", path: "/accounting/profit-loss", icon: <DollarSign /> },
      { title: "Cash Flow", path: "/accounting/cash-flow", icon: <CreditCard /> },
      { title: "Tax Settings", path: "/accounting/tax-settings", icon: <Settings /> },
    ],
  },
  {
    title: "Reports",
    icon: <BarChart2 />,
    children: [
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
          { title: "Customer Sales Summary", path: "/reports/customer-summary", icon: <UsersIcon /> },
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
        title: "Accounting Reports",
        icon: <BookIcon />,
        children: [
          { title: "Trial Balance", path: "/reports/trial-balance", icon: <BarChart /> },
          { title: "Profit & Loss", path: "/reports/profit-loss", icon: <DollarSign /> },
          { title: "Balance Sheet", path: "/reports/balance-sheet", icon: <BarChart /> },
          { title: "Journal Report", path: "/reports/journal", icon: <BookIcon /> },
        ]
      },
      { title: "Custom Reports", path: "/reports/custom", icon: <Layout /> },
      { title: "Saved Reports", path: "/reports/saved", icon: <Save /> },
    ],
  },
  {
    title: "Billing",
    icon: <DollarSign />,
    children: [
      { title: "Subscription Plans", path: "/billing/subscription", icon: <CreditCard /> },
      { title: "Payment History", path: "/billing/history", icon: <ClipboardList /> },
      { title: "Upgrade Plan", path: "/billing/upgrade", icon: <CreditCard /> },
    ],
  },
  {
    title: "Notifications",
    icon: <Bell />,
    children: [
      { title: "Email Templates", path: "/notifications/email", icon: <MailIcon /> },
      { title: "SMS Templates", path: "/notifications/sms", icon: <MailIcon /> },
      { title: "System Alerts", path: "/notifications/system-alerts", icon: <Bell /> },
    ],
  },
  {
    title: "Settings",
    icon: <Settings />,
    children: [
      { title: "Company & Branches", path: "/settings/companies", icon: <Home /> },
      { title: "Users & Roles", path: "/settings/users", icon: <UsersIcon /> },
      { title: "Permissions", path: "/settings/permissions", icon: <User /> },
      { title: "Units / Categories / Brands", path: "/settings/attributes", icon: <TagIcon /> },
      { title: "Tax & Currencies", path: "/settings/tax-currencies", icon: <DollarSign /> },
      { title: "Language & Localization", path: "/settings/localization", icon: <Settings /> },
      { title: "POS Settings", path: "/settings/pos", icon: <Settings /> },
      { title: "Device Management", path: "/settings/devices", icon: <Settings /> },
    ],
  },
  {
    title: "Audit Logs",
    icon: <ClipboardList />,
    children: [
      { title: "User Activities", path: "/audit-logs/user-activities", icon: <UsersIcon /> },
      { title: "Login History", path: "/audit-logs/login-history", icon: <User /> },
      { title: "Record Changes", path: "/audit-logs/record-changes", icon: <ClipboardList /> },
    ],
  },
  {
    title: "Extras",
    icon: <FilePlus />,
    children: [
      {
        title: "Imports / Exports",
        icon: <ArrowRight />,
        children: [
          { title: "Product Import", path: "/extras/imports/products", icon: <Box /> },
          { title: "Customer Import", path: "/extras/imports/customers", icon: <UsersIcon /> },
          { title: "Sales Import", path: "/extras/imports/sales", icon: <ShoppingCart /> },
        ],
      },
      {
        title: "Documents",
        icon: <File />,
        children: [
          { title: "Attachments (Invoices, Receipts, etc.)", path: "/extras/documents/attachments", icon: <File /> },
        ],
      },
    ],
  },
];
