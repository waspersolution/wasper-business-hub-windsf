
import type { SidebarItem } from "./SidebarNavigationItems";

// Helper function to recursively check if any child or grandchild is active
export function checkIfAnyChildActive(items: SidebarItem[], locationPath: string): boolean {
  for (const item of items) {
    // Check if current item is active
    if (item.path && (locationPath === item.path || locationPath.startsWith(`${item.path}/`))) {
      return true;
    }
    // If this item has children, check them too
    if (item.children && item.children.length > 0) {
      if (checkIfAnyChildActive(item.children, locationPath)) {
        return true;
      }
    }
  }

  return false;
}
