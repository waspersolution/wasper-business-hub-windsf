
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { navigationItems } from "@/components/Layout/SidebarNavigationItems";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { flattenNavigationItems } from "@/lib/navigation-utils";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const flattenedItems = React.useMemo(() => flattenNavigationItems(navigationItems), []);

  // Register keyboard shortcut to open command menu
  useHotkeys([
    {
      key: "k",
      ctrl: true,
      action: () => setOpen((open) => !open),
      preventDefault: true,
    },
    {
      key: "/",
      action: () => setOpen((open) => !open),
      preventDefault: true,
    },
  ]);

  const handleSelect = React.useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate]
  );

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search all features and pages..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {flattenedItems.map((item) => (
                item.path && (
                  <CommandItem
                    key={item.path}
                    value={item.title}
                    onSelect={() => handleSelect(item.path!)}
                    className="flex items-center gap-2"
                  >
                    {item.icon && (
                      <div className="flex h-4 w-4 items-center justify-center">
                        {item.icon}
                      </div>
                    )}
                    <span>{item.title}</span>
                    <div className="ml-auto text-xs text-muted-foreground">
                      {item.shortcut || ""}
                    </div>
                  </CommandItem>
                )
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
