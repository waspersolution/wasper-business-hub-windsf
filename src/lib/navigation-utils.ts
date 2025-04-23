
import { SidebarItem } from "@/components/Layout/SidebarNavigationItems";

// Function to flatten navigation items including children
export function flattenNavigationItems(items: SidebarItem[]): Array<SidebarItem & { shortcut?: string }> {
  return items.reduce((acc: Array<SidebarItem & { shortcut?: string }>, item) => {
    // Add the current item if it has a path
    if (item.title && item.path) {
      acc.push(item);
    }
    
    // If the item has children, recursively flatten them
    if (item.children && item.children.length > 0) {
      acc.push(...flattenNavigationItems(item.children));
    }
    
    return acc;
  }, []);
}
