
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useSession } from '@/contexts/SessionContext';

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
  },
  {
    title: 'Inventory',
    path: '/inventory',
    children: [
      { title: 'Products', path: '/inventory/products' },
      { title: 'Stock Adjustments', path: '/inventory/stock-adjustments' },
      { title: 'Transfers', path: '/inventory/transfers' },
      { title: 'Reorder Alerts', path: '/inventory/reorder-alerts' },
    ],
  },
  {
    title: 'Sales',
    path: '/sales',
    children: [
      { title: 'POS (New Sale)', path: '/sales/pos' },
      { title: 'Sales History', path: '/sales/history' },
      { title: 'Customers', path: '/sales/customers' },
    ],
  },
  {
    title: 'Purchases',
    path: '/purchases',
    children: [
      { title: 'Purchase Orders', path: '/purchases/orders' },
      { title: 'Goods Received', path: '/purchases/goods-received' },
      { title: 'Suppliers', path: '/purchases/suppliers' },
      { title: 'Purchase Ledger', path: '/purchases/ledger' },
    ],
  },
  {
    title: 'Accounting',
    path: '/accounting',
    children: [
      { title: 'Ledgers', path: '/accounting/ledgers' },
      { title: 'Reconciliation', path: '/accounting/reconciliation' },
      { title: 'Journal Entries', path: '/accounting/journal' },
    ],
  },
  {
    title: 'Reports',
    path: '/reports',
    children: [
      { title: 'Stock Reports', path: '/reports/stock' },
      { title: 'Sales Reports', path: '/reports/sales' },
      { title: 'Trial Balance & P&L', path: '/reports/financials' },
      { title: 'Dead Stock', path: '/reports/dead-stock' },
    ],
  },
  {
    title: 'Billing',
    path: '/billing',
    children: [
      { title: 'Subscription Plans', path: '/billing/subscription' },
    ],
  },
  {
    title: 'Notifications',
    path: '/notifications',
    children: [
      { title: 'Email & SMS Templates', path: '/notifications/templates' },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    children: [
      { title: 'Companies & Branches', path: '/settings/companies' },
      { title: 'Users & Roles', path: '/settings/users' },
      { title: 'Units/Categories/Brands', path: '/settings/attributes' },
    ],
  },
  {
    title: 'Audit Logs',
    path: '/audit-logs',
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

  // For items with children, show a dropdown
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

  // For items without children, show a link
  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-2 py-2 px-3 text-sm rounded-md hover:bg-wasper-light",
        isActive && "bg-wasper-light text-wasper-primary font-medium",
        isNested && "ml-4"
      )}
    >
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
