
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarItem } from "./SidebarNavigationItems";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

function SidebarMenuItem({
  item,
  locationPath,
  isNested,
}: {
  item: SidebarItem;
  locationPath: string;
  isNested?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    (item.path && locationPath === item.path) ||
    (item.path && locationPath.startsWith(`${item.path}/`));

  const isAnyChildActive =
    hasChildren &&
    item.children!.some(
      (child) =>
        (child.path && locationPath.startsWith(child.path)) ||
        (child.children &&
          child.children.some(
            (sub) =>
              sub.path && locationPath.startsWith(sub.path)
          ))
    );

  const expanded = isOpen || isAnyChildActive;

  const toggleSubmenu = () => {
    if (hasChildren) setIsOpen(!expanded);
  };

  if (hasChildren) {
    return (
      <div className={cn("space-y-1", isNested && "ml-4")}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left py-2 flex items-center",
            (isActive || isAnyChildActive) &&
              "bg-wasper-light text-wasper-primary font-medium",
            !isNested && "font-medium"
          )}
          onClick={toggleSubmenu}
        >
          {item.icon && (
            <span className="mr-2 flex items-center">{item.icon}</span>
          )}
          {item.title}
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 transition-transform",
              expanded ? "rotate-180" : ""
            )}
          />
        </Button>
        {expanded && (
          <div className="pt-1 pb-1">
            <SidebarMenu items={item.children!} isNested={true} />
          </div>
        )}
      </div>
    );
  }

  if (item.path) {
    return (
      <Link
        to={item.path}
        className={cn(
          "flex items-center gap-2 py-2 px-3 text-sm rounded-md hover:bg-wasper-light",
          isActive && "bg-wasper-light text-wasper-primary font-medium",
          isNested && "ml-4"
        )}
      >
        {item.icon && <span className="flex items-center">{item.icon}</span>}
        {item.title}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center py-2 px-3 text-xs font-semibold uppercase text-muted-foreground",
        isNested && "ml-4"
      )}
    >
      {item.icon && (
        <span className="mr-2 flex items-center">{item.icon}</span>
      )}
      {item.title}
    </div>
  );
}
