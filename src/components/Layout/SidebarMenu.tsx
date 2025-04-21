
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarItem } from "./SidebarNavigationItems";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

  // Check if any child or grandchild is active
  const isAnyChildActive = hasChildren && checkIfAnyChildActive(item.children!, locationPath);

  // Ensure menu is expanded if any child is active
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
            "w-full justify-start text-left py-2 flex items-center rounded-lg transition-all duration-200",
            (isActive || isAnyChildActive) &&
              "bg-gradient-to-r from-wasper-light to-wasper-light/50 text-wasper-primary font-medium",
            !isNested && "font-medium"
          )}
          onClick={toggleSubmenu}
        >
          {item.icon && (
            <span className="mr-2 flex items-center text-wasper-secondary">
              {item.icon}
            </span>
          )}
          {item.title}
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 transition-transform duration-200 text-muted-foreground",
              expanded ? "rotate-180" : ""
            )}
          />
        </Button>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pt-1 pb-1"
          >
            <SidebarMenu items={item.children!} isNested={true} />
          </motion.div>
        )}
      </div>
    );
  }

  if (item.path) {
    return (
      <Link
        to={item.path}
        className={cn(
          "flex items-center gap-2 py-2 px-3 text-sm rounded-lg transition-all duration-200 hover:bg-wasper-light/70",
          isActive && "bg-gradient-to-r from-wasper-light to-wasper-light/50 text-wasper-primary font-medium shadow-sm",
          isNested && "ml-4"
        )}
      >
        {item.icon && (
          <span className={cn(
            "flex items-center",
            isActive ? "text-wasper-primary" : "text-wasper-secondary"
          )}>
            {item.icon}
          </span>
        )}
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
        <span className="mr-2 flex items-center text-wasper-accent">
          {item.icon}
        </span>
      )}
      {item.title}
    </div>
  );
}

// Helper function to recursively check if any child or grandchild is active
function checkIfAnyChildActive(items: SidebarItem[], locationPath: string): boolean {
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
