
import { RefObject, useEffect } from 'react';

/**
 * Hook to handle keyboard navigation between elements
 * @param refs Object containing refs to be navigated between
 * @param keyMap Map of keys to target refs
 */
export function useKeyboardNavigation(
  refs: Record<string, RefObject<HTMLElement>>,
  keyMap: Record<string, { key: string; targetRef: string; modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean } }[]>
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Get the currently focused element id
      const activeElement = document.activeElement;
      const activeId = Object.keys(refs).find(
        (key) => refs[key].current === activeElement
      );

      if (!activeId) return;

      // Check if there's a mapping for this element
      const mappings = keyMap[activeId];
      if (!mappings) return;

      // Find the right mapping based on the key pressed
      const mapping = mappings.find(
        (m) => 
          m.key === e.key && 
          (!m.modifiers?.ctrl || e.ctrlKey) && 
          (!m.modifiers?.alt || e.altKey) &&
          (!m.modifiers?.shift || e.shiftKey)
      );

      if (mapping) {
        e.preventDefault();
        const targetRef = refs[mapping.targetRef];
        if (targetRef?.current) {
          targetRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [refs, keyMap]);
}

/**
 * Hook to focus a specific element on component mount
 * @param elementRef Reference to the element to focus
 * @param dependencies Array of dependencies that trigger focus when changed
 */
export function useInitialFocus(
  elementRef: RefObject<HTMLElement>,
  dependencies: any[] = []
) {
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  }, dependencies);
}

/**
 * Hook to trap focus in an element until a condition is met
 * @param elementRef Reference to the element to trap focus in
 * @param shouldTrap Function that returns true if focus should be trapped
 * @param onEscape Callback to run when Escape key is pressed
 */
export function useFocusTrap(
  elementRef: RefObject<HTMLElement>,
  shouldTrap: () => boolean,
  onEscape?: () => void
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !shouldTrap()) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
      }

      // Only trap Tab key if we should be trapping
      if (e.key === 'Tab' && shouldTrap()) {
        e.preventDefault();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, shouldTrap, onEscape]);
}
