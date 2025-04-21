
import { ClipboardList, UserCog, LogIn, FileText } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const auditLogsSection: SidebarItem = {
  title: "Audit Logs",
  icon: <ClipboardList />,
  children: [
    { title: "All Activities", path: "/audit-logs", icon: <ClipboardList /> },
    { title: "User Activities", path: "/audit-logs/user-activities", icon: <UserCog /> },
    { title: "Login History", path: "/audit-logs/login-history", icon: <LogIn /> },
    { title: "Record Changes", path: "/audit-logs/record-changes", icon: <FileText /> },
  ],
};
