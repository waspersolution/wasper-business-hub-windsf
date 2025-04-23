
import { SidebarItem } from "@/components/Layout/SidebarNavigationItems";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface CommandMenuContentProps {
  items: Array<SidebarItem & { shortcut?: string }>;
  onSelect: (path: string) => void;
}

export function CommandMenuContent({ items, onSelect }: CommandMenuContentProps) {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search all features and pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {items.map((item) => (
            item.path && (
              <CommandItem
                key={item.path}
                value={item.title}
                onSelect={() => onSelect(item.path!)}
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
  );
}
