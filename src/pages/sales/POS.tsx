import { useRef } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { Grid, List, Search, User, Plus, X, ChevronRight, Save, Clock, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: "all", name: "All Items", icon: Grid },
  { id: "beverages", name: "Beverages", icon: Grid },
  { id: "food", name: "Food", icon: Grid },
  { id: "electronics", name: "Electronics", icon: Grid },
  { id: "clothing", name: "Clothing", icon: Grid },
  { id: "personal", name: "Personal Care", icon: Grid },
];

export default function POS() {
  // Custom hooks
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
    isDraftDialogOpen,
    currentQuantity,
    selectedProductForEdit,
    selectedCartIndex,
    isAddingPayment,
    isMobileCartOpen,
    setIsOnline,
    setViewMode,
    setSearchQuery,
    setSelectedCategory,
    setIsReceiptOpen,
    setIsDraftDialogOpen,
    setCurrentQuantity,
    setSelectedProductForEdit,
    setSelectedCartIndex,
    setIsAddingPayment,
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

  useKeyboardNavigation(
    {
      searchInput: searchInputRef,
      quantityInput: quantityInputRef,
      addToCartButton: addToCartButtonRef,
      cartContainer: cartContainerRef,
      paymentMethod: paymentMethodRef,
      completeButton: completeButtonRef
    },
    {
      searchInput: [
        { key: 'Enter', targetRef: 'quantityInput' },
        { key: 'Tab', targetRef: 'quantityInput' },
        { key: 'ArrowDown', targetRef: 'cartContainer' },
      ],
      quantityInput: [
        { key: 'Enter', targetRef: 'addToCartButton' },
        { key: 'Tab', targetRef: 'addToCartButton' },
      ],
      addToCartButton: [
        { key: 'Enter', targetRef: 'searchInput' },
        { key: 'Tab', targetRef: 'paymentMethod' },
      ],
      cartContainer: [
        { key: 'Enter', targetRef: 'quantityInput' },
        { key: 'ArrowUp', targetRef: 'searchInput' },
        { key: 'ArrowDown', targetRef: 'paymentMethod' },
      ],
      paymentMethod: [
        { key: 'Enter', targetRef: 'completeButton' },
        { key: 'ArrowUp', targetRef: 'cartContainer' },
      ],
      completeButton: [
        { key: 'Enter', targetRef: 'searchInput' },
        { key: 'ArrowUp', targetRef: 'paymentMethod' },
      ]
    }
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCurrentQuantity(value);
    } else {
      setCurrentQuantity(1);
    }
  };

  const handleCompleteSale = () => {
    if (cartItems.length === 0) {
      return;
    }
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
    <DashboardLayout>
      <div className="flex flex-col w-full">
        <POSHeader isOnline={isOnline} isMobile={isMobile} />

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full min-h-[80vh]">
          <div className="flex-1 flex flex-col gap-4">
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Branch: <span className="font-bold text-wasper-primary">Main Branch</span></h3>
                  <Badge variant="outline">Branch ID: B001</Badge>
                </div>
                <CustomerGroupSelector 
                  currentBranchId="B001"
                  onCustomerGroupSelect={handleCustomerGroupSelect}
                  onCustomerSelect={handleCustomerSelect}
                />
              </CardContent>
            </Card>

            <DraftSales onResumeDraft={() => {}} />

            <POSSearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onKeyDown={handleSearchKeyDown}
              inputRef={searchInputRef}
            />

            <POSQuantityInput 
              quantity={currentQuantity}
              onQuantityChange={handleQuantityChange}
              onKeyDown={handleSearchKeyDown}
              onAddToCart={() => addToCart(filteredProducts[0], currentQuantity)}
              inputRef={quantityInputRef}
              buttonRef={addToCartButtonRef}
              disabled={filteredProducts.length === 0}
            />

            <div className="bg-white rounded-lg shadow p-3">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="flex w-full overflow-x-auto pb-1 hide-scrollbar">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex gap-1 items-center whitespace-nowrap"
                    >
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <POSProductList 
              viewMode={viewMode}
              products={filteredProducts}
              onProductSelect={(product) => addToCart(product, currentQuantity)}
            />
          </div>

          <div className="w-full md:max-w-sm md:flex flex-col gap-4 hidden">
            <POSOfflineIndicator isOnline={isOnline} />
            <POSCustomerInfo 
              selectedCustomer={selectedCustomer}
              selectedGroup={selectedGroup}
            />
            
            <div 
              className="bg-white rounded-lg shadow-lg p-4 flex-1 flex flex-col"
              ref={cartContainerRef}
              tabIndex={0}
              aria-label="Shopping cart"
            >
              <POSCart 
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onCartItemKeyDown={() => {}}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-4">
              <POSSummary 
                onComplete={handleCompleteSale} 
                paymentMethodRef={paymentMethodRef}
                completeButtonRef={completeButtonRef}
              />
            </div>
          </div>

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
        </div>
      </div>
    </DashboardLayout>
  );
}
