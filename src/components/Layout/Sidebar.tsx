
// Move all icon imports to the top before usage

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useSession } from '@/contexts/SessionContext';
import {
  Home,
  Box,
  ShoppingCart,
  Archive,
  CreditCard,
  BarChart2,
  DollarSign,
  Bell,
  Settings,
  ClipboardList,
  ArrowRight,
  Users as UsersIcon,
  Package as PackageIcon,
  RefreshCw as RefreshCwIcon,
  Book as BookIcon,
  Mail as MailIcon,
  Tag as TagIcon,
} from 'lucide-react';

type SidebarItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

// Navigation structure based on the user's requirements
const navigationItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Home />,
  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon: <Box />,
    children: [
      { title: 'Products', path: '/inventory/products', icon: <Box /> },
      { title: 'Stock Adjustments', path: '/inventory/stock-adjustments', icon: <ClipboardList /> },
      { title: 'Transfers', path: '/inventory/transfers', icon: <ArrowRight /> },
      { title: 'Reorder Alerts', path: '/inventory/reorder-alerts', icon: <Bell /> },
    ],
  },
  {
    title: 'Sales',
    path: '/sales',
    icon: <ShoppingCart />,
    children: [
      { title: 'POS (New Sale)', path: '/sales/pos', icon: <ShoppingCart /> },
      { title: 'Sales History', path: '/sales/history', icon: <ClipboardList /> },
      { title: 'Customers', path: '/sales/customers', icon: <UsersIcon /> },
    ],
  },
  {
    title: 'Purchases',
    path: '/purchases',
    icon: <Archive />,
    children: [
      { title: 'Purchase Orders', path: '/purchases/orders', icon: <ClipboardList /> },
      { title: 'Goods Received', path: '/purchases/goods-received', icon: <PackageIcon /> },
      { title: 'Suppliers', path: '/purchases/suppliers', icon: <UsersIcon /> },
      { title: 'Purchase Ledger', path: '/purchases/ledger', icon: <CreditCard /> },
    ],
  },
  {
    title: 'Accounting',
    path: '/accounting',
    icon: <CreditCard />,
    children: [
      { title: 'Ledgers', path: '/accounting/ledgers', icon: <ClipboardList /> },
      { title: 'Reconciliation', path: '/accounting/reconciliation', icon: <RefreshCwIcon /> },
      { title: 'Journal Entries', path: '/accounting/journal', icon: <BookIcon /> },
    ],
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <BarChart2 />,
    children: [
      { title: 'Stock Reports', path: '/reports/stock', icon: <BarChart2 /> },
      { title: 'Sales Reports', path: '/reports/sales', icon: <BarChart2 /> },
      { title: 'Trial Balance & P&L', path: '/reports/financials', icon: <DollarSign /> },
      { title: 'Dead Stock', path: '/reports/dead-stock', icon: <Archive /> },
    ],
  },
  {
    title: 'Billing',
    path: '/billing',
    icon: <DollarSign />,
    children: [{ title: 'Subscription Plans', path: '/billing/subscription', icon: <CreditCard /> }],
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: <Bell />,
    children: [{ title: 'Email & SMS Templates', path: '/notifications/templates', icon: <MailIcon /> }],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings />,
    children: [
      { title: 'Companies & Branches', path: '/settings/companies', icon: <Home /> },
      { title: 'Users & Roles', path: '/settings/users', icon: <UsersIcon /> },
      { title: 'Units/Categories/Brands', path: '/settings/attributes', icon: <TagIcon /> },
    ],
  },
  {
    title: 'Audit Logs',
    path: '/audit-logs',
    icon: <ClipboardList />,
  },
];

const SidebarItem = ({ item, isNested = false }: { item: SidebarItem; isNested?: boolean }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

  // Toggle submenu
  const toggleSubmenu = () => {
    if (item.children?.length) {
      setIsOpen(!isOpen);
    }
  };

  // For items with children, show a dropdown with icon
  if (item.children?.length) {
    return (
      <div className={cn("space-y-1", isNested && "ml-4")}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left py-2",
            isActive && "bg-wasper-light text-wasper-primary",
            !isNested && "font-medium"
          )}
          onClick={toggleSubmenu}
        >
          {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
          {item.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("ml-auto h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </Button>
        {isOpen && (
          <div className="pt-1 pb-1">
            {item.children.map((child, index) => (
              <SidebarItem key={`${child.path}-${index}`} item={child} isNested={true} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // For items without children, show a link with icon
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
};

export function Sidebar() {
  const { session } = useSession();

  return (
    <div className="h-screen border-r bg-background">
      <div className="h-16 flex items-center px-4 border-b">
        <h2 className="text-lg font-semibold text-wasper-primary">Wasper Business Hub</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] py-2">
        <div className="px-3 py-2">
          {navigationItems.map((item, index) => (
            <SidebarItem key={`${item.path}-${index}`} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

