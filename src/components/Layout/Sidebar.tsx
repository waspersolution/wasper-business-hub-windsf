
// Move all icon imports to the top before usage

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/SessionContext";
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
  ChevronDown,
  ChevronLeft,
  FilePlus,
  File,
  User,
  Tag as TagIcon,
  Calendar,
  Mail as MailIcon,
  Settings,
  Home,
} from "lucide-react";

type SidebarItem = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

// New Navigation Structure per user specification
const navigationItems: SidebarItem[] = [
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
      { title: "Reconciliation", path: "/accounting/reconciliation", icon: <RefreshCwIcon /> },
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
      { title: "Stock Reports", path: "/reports/stock", icon: <BarChart2 /> },
      { title: "Stock Summary", path: "/reports/stock-summary", icon: <BarChart2 /> },
      { title: "Stock Movement", path: "/reports/stock-movement", icon: <BarChart2 /> },
      { title: "Valuation Report", path: "/reports/valuation", icon: <BarChart2 /> },
      { title: "Sales Reports", path: "/reports/sales", icon: <BarChart2 /> },
      { title: "Daily/Weekly/Monthly Sales", path: "/reports/sales-periods", icon: <Calendar /> },
      { title: "Top Selling Products", path: "/reports/top-products", icon: <Box /> },
      { title: "Customer Sales Summary", path: "/reports/customer-summary", icon: <UsersIcon /> },
      { title: "Purchase Reports", path: "/reports/purchase", icon: <Archive /> },
      { title: "Purchase Summary", path: "/reports/purchase-summary", icon: <Archive /> },
      { title: "Supplier-wise Purchases", path: "/reports/supplier-purchases", icon: <User /> },
      { title: "Accounting Reports", path: "/reports/accounting", icon: <DollarSign /> },
      { title: "Trial Balance", path: "/reports/trial-balance", icon: <BarChart2 /> },
      { title: "Profit & Loss", path: "/reports/profit-loss", icon: <DollarSign /> },
      { title: "Balance Sheet", path: "/reports/balance-sheet", icon: <BarChart2 /> },
      { title: "Journal Report", path: "/reports/journal", icon: <BookIcon /> },
      { title: "Custom Reports", path: "/reports/custom", icon: <FilePlus /> },
      { title: "Saved Reports", path: "/reports/saved", icon: <File /> },
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

const SidebarItemComponent = ({ item, isNested = false }: { item: SidebarItem; isNested?: boolean }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive =
    (item.path && location.pathname === item.path) ||
    (item.path && location.pathname.startsWith(`${item.path}/`));

  const hasChildren = item.children && item.children.length > 0;

  // Auto-open group if current URL is one of its subitems.
  const isAnyChildActive =
    hasChildren &&
    item.children!.some(
      (child) =>
        (child.path && location.pathname.startsWith(child.path)) ||
        (child.children && child.children.some((sub) => sub.path && location.pathname.startsWith(sub.path)))
    );

  // Expand if active or any child is active
  const expanded = isOpen || isAnyChildActive;

  const toggleSubmenu = () => {
    if (hasChildren) setIsOpen(!expanded);
  };

  // Multi-level handling for nested menus
  if (hasChildren) {
    return (
      <div className={cn("space-y-1", isNested && "ml-4")}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left py-2 flex items-center",
            (isActive || isAnyChildActive) && "bg-wasper-light text-wasper-primary font-medium",
            !isNested && "font-medium"
          )}
          onClick={toggleSubmenu}
        >
          {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
          {item.title}
          <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", expanded ? "rotate-180" : "")} />
        </Button>
        {expanded && (
          <div className="pt-1 pb-1">
            {item.children!.map((child, index) => (
              <SidebarItemComponent key={`${child.title}-${index}`} item={child} isNested={true} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Only link if path exists (skip headings/separators)
  if (item.path) {
    return (
      <Link
        to={item.path}
        className={cn(
          "flex items-center gap-2 py-2 px-3 text-sm rounded-md hover:bg-wasper-light",
          isActive && "bg-wasper-light text-wasper-primary font-medium",
          isNested && "ml-4"
        )}
      >
        {item.icon && <span className="flex items-center">{item.icon}</span>}
        {item.title}
      </Link>
    );
  }

  // Render non-link headings without a path (if any)
  return (
    <div className={cn("flex items-center py-2 px-3 text-xs font-semibold uppercase text-muted-foreground", isNested && "ml-4")}>
      {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
      {item.title}
    </div>
  );
};

export function Sidebar() {
  const { session } = useSession();

  return (
    <div className="h-screen border-r bg-background">
      <div className="h-16 flex items-center px-4 border-b">
        <h2 className="text-lg font-semibold text-wasper-primary">Wasper Business Hub</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] py-2">
        <div className="px-3 py-2 space-y-1">
          {navigationItems.map((item, index) => (
            <SidebarItemComponent key={`${item.title}-${index}`} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
