
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
    const handleSearchKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === refs.searchInputRef.current && e.key === 'Enter') {
        e.preventDefault();
        refs.quantityInputRef.current?.focus();
      }
    };

    const handleQuantityKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === refs.quantityInputRef.current && e.key === 'Enter') {
        e.preventDefault();
        refs.addToCartButtonRef.current?.focus();
      }
    };

    const handleCartKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === refs.cartContainerRef.current) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          refs.paymentMethodRef.current?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          refs.searchInputRef.current?.focus();
        }
      }
    };

    const handlePaymentMethodKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === refs.paymentMethodRef.current && e.key === 'Enter') {
        e.preventDefault();
        refs.completeButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleSearchKeyDown);
    window.addEventListener('keydown', handleQuantityKeyDown);
    window.addEventListener('keydown', handleCartKeyDown);
    window.addEventListener('keydown', handlePaymentMethodKeyDown);

    return () => {
      window.removeEventListener('keydown', handleSearchKeyDown);
      window.removeEventListener('keydown', handleQuantityKeyDown);
      window.removeEventListener('keydown', handleCartKeyDown);
      window.removeEventListener('keydown', handlePaymentMethodKeyDown);
    };
  }, [refs]);
}
