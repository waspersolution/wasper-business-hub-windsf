
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import POSReceipt from "./components/POSReceipt";
import POSContainer from "./components/POSContainer";
import POSLeftPanel from "./components/POSLeftPanel";
import POSRightPanel from "./components/POSRightPanel";
import POSCart from "./components/POSCart";
import POSSummary from "./components/POSSummary";
import { useCart } from "./hooks/useCart";
import { useCustomerSelection } from "./hooks/useCustomerSelection";
import { usePOSUIState } from "./hooks/usePOSUIState";
import { useProducts } from "./hooks/useProducts";
import { usePOSKeyboardNavigation } from "./hooks/usePOSKeyboardNavigation";

export default function POS() {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();

  const {
    selectedCustomer,
    selectedGroup,
    handleCustomerSelect,
    handleCustomerGroupSelect
  } = useCustomerSelection();

  const {
    isOnline,
    viewMode,
    searchQuery,
    selectedCategory,
    isReceiptOpen,
    currentQuantity,
    isMobileCartOpen,
    setSearchQuery,
    setViewMode,
    setSelectedCategory,
    setIsReceiptOpen,
    setCurrentQuantity,
    setIsMobileCartOpen
  } = usePOSUIState();

  const { data: productsData } = useProducts(selectedCategory, searchQuery);
  const filteredProducts = productsData?.products || [];
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const addToCartButtonRef = useRef<HTMLButtonElement>(null);
  const cartContainerRef = useRef<HTMLDivElement>(null);
  const paymentMethodRef = useRef<HTMLButtonElement>(null);
  const completeButtonRef = useRef<HTMLButtonElement>(null);
  
  const isMobile = useIsMobile();

  usePOSKeyboardNavigation({
    searchInputRef,
    quantityInputRef,
    addToCartButtonRef,
    cartContainerRef,
    paymentMethodRef,
    completeButtonRef
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCurrentQuantity(value);
    } else {
      setCurrentQuantity(1);
    }
  };

  const handleCompleteSale = () => {
    if (cartItems.length === 0) return;
    setIsReceiptOpen(true);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredProducts.length > 0) {
      e.preventDefault();
      addToCart(filteredProducts[0], currentQuantity);
      setCurrentQuantity(1);
      setSearchQuery("");
      setTimeout(() => {
        quantityInputRef.current?.focus();
      }, 10);
    }
  };

  return (
    <POSContainer isOnline={isOnline} isMobile={isMobile}>
      <POSLeftPanel 
        searchQuery={searchQuery}
        viewMode={viewMode}
        selectedCategory={selectedCategory}
        currentQuantity={currentQuantity}
        products={filteredProducts}
        onSearchChange={setSearchQuery}
        onViewModeChange={setViewMode}
        onCategoryChange={setSelectedCategory}
        onQuantityChange={handleQuantityChange}
        onProductSelect={(product) => addToCart(product, currentQuantity)}
        onSearchKeyDown={handleSearchKeyDown}
        searchInputRef={searchInputRef}
        quantityInputRef={quantityInputRef}
        addToCartButtonRef={addToCartButtonRef}
        onCustomerGroupSelect={handleCustomerGroupSelect}
        onCustomerSelect={handleCustomerSelect}
      />

      <POSRightPanel 
        isOnline={isOnline}
        selectedCustomer={selectedCustomer}
        selectedGroup={selectedGroup}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCartItemKeyDown={() => {}}
        cartContainerRef={cartContainerRef}
        paymentMethodRef={paymentMethodRef}
        completeButtonRef={completeButtonRef}
        onComplete={handleCompleteSale}
      />

      {isMobile && (
        <Sheet open={isMobileCartOpen} onOpenChange={setIsMobileCartOpen}>
          <SheetTrigger asChild>
            <Button 
              className="fixed bottom-4 right-4 z-10 rounded-full shadow-lg size-14 p-0"
              onClick={() => setIsMobileCartOpen(true)}
            >
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full size-6 flex items-center justify-center">
                {cartItems.length}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">₦</span>
                <span className="text-[10px]">View Cart</span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] px-0">
            <SheetHeader className="px-4">
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <div 
                className="flex-1 overflow-auto p-4"
                ref={cartContainerRef}
                tabIndex={0}
              >
                <POSCart 
                  items={cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onCartItemKeyDown={() => {}}
                />
              </div>
              <div className="p-4 border-t">
                <POSSummary 
                  onComplete={() => {
                    setIsMobileCartOpen(false);
                    setIsReceiptOpen(true);
                  }}
                  paymentMethodRef={paymentMethodRef}
                  completeButtonRef={completeButtonRef}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <POSReceipt 
        isOpen={isReceiptOpen}
        onOpenChange={setIsReceiptOpen}
        cartItems={cartItems}
        onClose={() => {
          setIsReceiptOpen(false);
          clearCart();
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 10);
        }}
        searchInputRef={searchInputRef}
      />
    </POSContainer>
  );
}
