
import { FilePlus, ArrowRight, Box, Users, ShoppingCart, File, FileImage, Receipt } from "lucide-react";
import type { SidebarItem } from "../SidebarNavigationItems";

export const extrasSection: SidebarItem = {
  title: "Extras",
  icon: <FilePlus />,
  children: [
    {
      title: "Imports / Exports",
      icon: <ArrowRight />,
      children: [
        { title: "Product Import", path: "/extras/imports/products", icon: <Box /> },
        { title: "Customer Import", path: "/extras/imports/customers", icon: <Users /> },
        { title: "Sales Import", path: "/extras/imports/sales", icon: <ShoppingCart /> },
      ],
    },
    {
      title: "Documents",
      icon: <File />,
      children: [
        { title: "Attachments", path: "/extras/documents/attachments", icon: <FileImage /> },
        { title: "Invoice Templates", path: "/extras/documents/invoice-templates", icon: <Receipt /> },
      ],
    },
  ],
};
