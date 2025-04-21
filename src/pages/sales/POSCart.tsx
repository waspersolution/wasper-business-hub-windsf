
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";

const mockCart = [
  { id: 1, name: "Coca-Cola 50cl", price: 200, qty: 2 },
  { id: 2, name: "Bread Sliced 600g", price: 950, qty: 1 }
];

interface POSCartProps {
  items?: any[];
  onUpdateQuantity?: (id: number, qty: number) => void;
  onRemoveItem?: (id: number) => void;
  customerDiscount?: number;
}

export default function POSCart({ 
  items = mockCart, 
  onUpdateQuantity, 
  onRemoveItem,
  customerDiscount = 0
}: POSCartProps) {
  // Helper function to increment quantity
  const incrementQuantity = (id: number) => {
    if (onUpdateQuantity) {
      const item = items.find(item => item.id === id);
      if (item) {
        onUpdateQuantity(id, item.qty + 1);
      }
    }
  };

  // Helper function to decrement quantity
  const decrementQuantity = (id: number) => {
    if (onUpdateQuantity) {
      const item = items.find(item => item.id === id);
      if (item && item.qty > 1) {
        onUpdateQuantity(id, item.qty - 1);
      }
    }
  };

  // Helper function to remove item
  const removeItem = (id: number) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-3 text-wasper-primary flex items-center justify-between">
        <span>Cart</span>
        <span className="text-sm bg-wasper-light text-wasper-primary px-2 py-0.5 rounded-full">
          {items.length} items
        </span>
      </h2>
      
      <div className="flex-1 overflow-auto">
        {items.length === 0 && (
          <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
            Your cart is empty
          </div>
        )}
        
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3 border-b last:border-b-0"
          >
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                ₦{item.price.toLocaleString()} per unit
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6 rounded-full"
                  onClick={() => decrementQuantity(item.id)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.qty}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6 rounded-full"
                  onClick={() => incrementQuantity(item.id)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="min-w-[80px] text-right font-bold">
                ₦{(item.price * item.qty).toLocaleString()}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-muted-foreground hover:text-red-500"
                onClick={() => removeItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Discount Display */}
      {customerDiscount > 0 && (
        <div className="mt-3 p-2 bg-green-50 border border-green-100 rounded-md">
          <div className="text-sm text-green-700 font-medium">
            Customer group discount: {customerDiscount}%
          </div>
        </div>
      )}
      
      <Button
        variant="destructive"
        size="sm"
        className="w-full mt-3"
        disabled={items.length === 0}
      >
        Clear Cart
      </Button>
    </div>
  );
}
