
import { useLocation } from "react-router-dom";
import type { SidebarItem } from "./SidebarNavigationItems";
import { SidebarMenuItem } from "./SidebarMenuItem";

type SidebarMenuProps = {
  items: SidebarItem[];
  isNested?: boolean;
};

export function SidebarMenu({ items, isNested = false }: SidebarMenuProps) {
  const location = useLocation();
  return (
    <div>
      {items.map((item, idx) => (
        <SidebarMenuItem
          key={`${item.title}-${idx}`}
          item={item}
          locationPath={location.pathname}
          isNested={isNested}
        />
      ))}
    </div>
  );
}
