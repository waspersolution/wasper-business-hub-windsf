
import * as React from "react";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { CommandDialog } from "@/components/ui/command";
import { SearchButton } from "./CommandSearch/SearchButton";
import { CommandMenuContent } from "./CommandSearch/CommandMenuContent";
import { useCommandMenu } from "@/hooks/use-command-menu";

export function CommandSearch() {
  const { open, setOpen, flattenedItems, handleSelect } = useCommandMenu();

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

  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenuContent items={flattenedItems} onSelect={handleSelect} />
      </CommandDialog>
    </>
  );
}
