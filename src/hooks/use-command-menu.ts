
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "@/components/Layout/SidebarNavigationItems";
import { flattenNavigationItems } from "@/lib/navigation-utils";

export function useCommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const flattenedItems = flattenNavigationItems(navigationItems);

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate]
  );

  return {
    open,
    setOpen,
    flattenedItems,
    handleSelect,
  };
}
