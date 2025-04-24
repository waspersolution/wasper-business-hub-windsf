
import { Settings, Building, Users, Shield, Tag, DollarSign, Globe, ShoppingCart, Smartphone, Database, Printer } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const settingsSection: SidebarItem = {
  title: "Settings",
  icon: <Settings />,
  children: [
    { title: "Settings Dashboard", path: "/settings", icon: <Settings /> },
    { title: "Companies & Branches", path: "/settings/companies", icon: <Building /> },
    { title: "Users & Roles", path: "/settings/users", icon: <Users /> },
    { title: "Permissions", path: "/settings/permissions", icon: <Shield /> },
    { title: "Units / Categories / Brands", path: "/settings/attributes", icon: <Tag /> },
    { title: "Tax & Currencies", path: "/settings/tax-currencies", icon: <DollarSign /> },
    { title: "Language & Localization", path: "/settings/localization", icon: <Globe /> },
    { title: "POS Settings", path: "/settings/pos", icon: <ShoppingCart /> },
    { title: "Receipt Settings", path: "/settings/receipt", icon: <Printer /> },
    { title: "Device Management", path: "/settings/devices", icon: <Smartphone /> },
    { title: "Backup & Restore", path: "/settings/backup-restore", icon: <Database /> },
    // Add Developer Tools (only visible to super_admin)
    { title: "Developer Tools", path: "/settings/developer-tools", icon: <Database /> },
  ],
};
