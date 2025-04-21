
import { 
  Box, 
  ClipboardList, 
  Archive, 
  ArrowRight, 
  Bell 
} from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const inventorySection: SidebarItem = {
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
};
