
import { Archive, ClipboardList, Package, Users, User, CreditCard } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const purchasesSection: SidebarItem = {
  title: "Purchases",
  icon: <Archive />,
  children: [
    { title: "Purchase Orders", path: "/purchases/orders", icon: <ClipboardList /> },
    { title: "Goods Received Notes", path: "/purchases/goods-received", icon: <Package /> },
    { title: "Purchase Returns", path: "/purchases/returns", icon: <Archive /> },
    { title: "Suppliers", path: "/purchases/suppliers", icon: <Users /> },
    { title: "Supplier Groups", path: "/purchases/supplier-groups", icon: <User /> },
    { title: "Purchase Ledger", path: "/purchases/ledger", icon: <CreditCard /> },
  ],
};
