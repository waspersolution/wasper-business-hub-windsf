
import { Button } from "@/components/ui/button";
import { POSCartHeader } from "./POSCartHeader";
import { POSCartItem } from "./POSCartItem";
import { POSCartDiscount } from "./POSCartDiscount";

interface POSCartProps {
  items: any[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemoveItem: (id: number) => void;
  customerDiscount?: number;
  onCartItemKeyDown?: (event: React.KeyboardEvent, index: number) => void;
}

export default function POSCart({ 
  items = [], 
  onUpdateQuantity, 
  onRemoveItem,
  customerDiscount = 0,
  onCartItemKeyDown
}: POSCartProps) {
  return (
    <div className="flex flex-col h-full">
      <POSCartHeader itemCount={items.length} />
      
      <div className="flex-1 overflow-auto">
        {items.length === 0 && (
          <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
            Your cart is empty
          </div>
        )}
        
        {items.map((item, index) => (
          <POSCartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onKeyDown={(e) => onCartItemKeyDown?.(e, index)}
          />
        ))}
      </div>
      
      <POSCartDiscount discount={customerDiscount} />
      
      <Button
        variant="destructive"
        size="sm"
        className="w-full mt-3"
        disabled={items.length === 0}
        onClick={() => items.forEach(item => onRemoveItem(item.id))}
      >
        Clear Cart
      </Button>
    </div>
  );
}
