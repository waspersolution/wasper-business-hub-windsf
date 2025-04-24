
import { RefObject, useEffect } from 'react';

interface POSRefs {
  searchInputRef: RefObject<HTMLInputElement>;
  quantityInputRef: RefObject<HTMLInputElement>;
  addToCartButtonRef: RefObject<HTMLButtonElement>;
  cartContainerRef: RefObject<HTMLDivElement>;
  paymentMethodRef: RefObject<HTMLButtonElement>;
  completeButtonRef: RefObject<HTMLButtonElement>;
}

export function usePOSKeyboardNavigation(refs: POSRefs) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === refs.searchInputRef.current) {
        if (e.key === 'Enter') {
          e.preventDefault();
          refs.quantityInputRef.current?.focus();
        }
      } else if (document.activeElement === refs.quantityInputRef.current) {
        if (e.key === 'Enter') {
          e.preventDefault();
          refs.addToCartButtonRef.current?.focus();
        }
      } else if (document.activeElement === refs.cartContainerRef.current) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          refs.paymentMethodRef.current?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          refs.searchInputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [refs]);
}
