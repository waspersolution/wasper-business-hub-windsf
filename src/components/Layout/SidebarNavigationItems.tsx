
import type { ReactNode } from "react";

export type SidebarItem = {
  title: string;
  path?: string;
  icon?: ReactNode;
  children?: SidebarItem[];
};

// Section imports
import { dashboardSection } from "./sidebar-items/dashboard";
import { inventorySection } from "./sidebar-items/inventory";
import { salesSection } from "./sidebar-items/sales";
import { purchasesSection } from "./sidebar-items/purchases";
import { accountingSection } from "./sidebar-items/accounting";
import { reportsSection } from "./sidebar-items/reports";
import { billingSection } from "./sidebar-items/billing";
import { notificationsSection } from "./sidebar-items/notifications";
import { settingsSection } from "./sidebar-items/settings";
import { auditLogsSection } from "./sidebar-items/audit-logs";
import { extrasSection } from "./sidebar-items/extras";

// Export as array
export const navigationItems: SidebarItem[] = [
  dashboardSection,
  inventorySection,
  salesSection,
  purchasesSection,
  accountingSection,
  reportsSection,
  billingSection,
  notificationsSection,
  settingsSection,
  auditLogsSection,
  extrasSection,
];
