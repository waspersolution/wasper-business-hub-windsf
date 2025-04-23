
import { useEffect } from "react";

type HotkeyAction = () => void;

interface Hotkey {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  action: HotkeyAction;
  preventDefault?: boolean;
}

export function useHotkeys(hotkeys: Hotkey[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const hotkey of hotkeys) {
        const ctrlMatch = !hotkey.ctrl || event.ctrlKey;
        const altMatch = !hotkey.alt || event.altKey;
        const shiftMatch = !hotkey.shift || event.shiftKey;
        const metaMatch = !hotkey.meta || event.metaKey;
        const keyMatch = event.key.toLowerCase() === hotkey.key.toLowerCase();

        if (ctrlMatch && altMatch && shiftMatch && metaMatch && keyMatch) {
          if (hotkey.preventDefault) {
            event.preventDefault();
          }
          hotkey.action();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hotkeys]);
}
