
import POSOfflineIndicator from "./POSOfflineIndicator";
import POSCustomerInfo from "./POSCustomerInfo";
import POSCart from "./POSCart";
import POSSummary from "./POSSummary";
import { Customer } from "@/types/sales";

interface POSRightPanelProps {
  isOnline: boolean;
  selectedCustomer: Customer | null;
  selectedGroup: string | null;
  cartItems: any[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemoveItem: (id: number) => void;
  onCartItemKeyDown: () => void;
  cartContainerRef: React.RefObject<HTMLDivElement>;
  paymentMethodRef: React.RefObject<HTMLButtonElement>;
  completeButtonRef: React.RefObject<HTMLButtonElement>;
  onComplete: () => void;
}

export default function POSRightPanel({
  isOnline,
  selectedCustomer,
  selectedGroup,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCartItemKeyDown,
  cartContainerRef,
  paymentMethodRef,
  completeButtonRef,
  onComplete
}: POSRightPanelProps) {
  return (
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
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onCartItemKeyDown={onCartItemKeyDown}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-4">
        <POSSummary 
          onComplete={onComplete} 
          paymentMethodRef={paymentMethodRef}
          completeButtonRef={completeButtonRef}
        />
      </div>
    </div>
  );
}
