
import { Bell, Mail } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const notificationsSection: SidebarItem = {
  title: "Notifications",
  icon: <Bell />,
  children: [
    { title: "Templates", path: "/notifications/templates", icon: <Mail /> },
  ],
};
