
import { ShoppingCart, ClipboardList, File, Archive, Package, Users, User, Tag, CreditCard } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const salesSection: SidebarItem = {
  title: "Sales",
  icon: <ShoppingCart />,
  children: [
    { title: "POS (New Sale)", path: "/sales/pos", icon: <ShoppingCart /> },
    { title: "Sales History", path: "/sales/history", icon: <ClipboardList /> },
    { title: "Quotations", path: "/sales/quotations", icon: <File /> },
    { title: "Sales Returns", path: "/sales/returns", icon: <Archive /> },
    { title: "Deliveries", path: "/sales/deliveries", icon: <Package /> },
    { title: "Customers", path: "/sales/customers", icon: <Users /> },
    { title: "Customer Groups", path: "/sales/customer-groups", icon: <User /> },
    { title: "Discount Rules", path: "/sales/discounts", icon: <Tag /> },
    { title: "Payment Plans", path: "/sales/payment-plans", icon: <CreditCard /> },
  ],
};
