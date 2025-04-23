
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "./SidebarNavigationItems";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SidebarMenu } from "./SidebarMenu";
import { checkIfAnyChildActive } from "./checkIfAnyChildActive";

type SidebarMenuItemProps = {
  item: SidebarItem;
  locationPath: string;
  isNested?: boolean;
};

export function SidebarMenuItem({
  item,
  locationPath,
  isNested,
}: SidebarMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    (item.path && locationPath === item.path) ||
    (item.path && locationPath.startsWith(`${item.path}/`));

  // Check if any child or grandchild is active
  const isAnyChildActive = hasChildren && checkIfAnyChildActive(item.children!, locationPath);

  // Initialize expanded state based on active children
  useEffect(() => {
    if (isAnyChildActive) {
      setIsOpen(true);
    }
  }, [isAnyChildActive]);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
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
              isOpen ? "rotate-180" : ""
            )}
          />
        </Button>
        {isOpen && (
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
