
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";

const mockCart = [
  { id: 1, name: "Coca-Cola 50cl", price: 200, qty: 2 },
  { id: 2, name: "Bread Sliced 600g", price: 950, qty: 1 }
];

export default function POSCart() {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-3 text-wasper-primary flex items-center justify-between">
        <span>Cart</span>
        <span className="text-sm bg-wasper-light text-wasper-primary px-2 py-0.5 rounded-full">
          2 items
        </span>
      </h2>
      
      {/* Customer Selection */}
      <div className="mb-4">
        <div className="flex items-center gap-2 p-2 border border-dashed rounded-md text-sm">
          <span className="text-muted-foreground">Customer:</span>
          <span className="font-medium">Walk-in Customer</span>
          <Button variant="ghost" size="sm" className="ml-auto h-7 px-2">
            Change
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {mockCart.length === 0 && (
          <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
            Your cart is empty
          </div>
        )}
        
        {mockCart.map((item) => (
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
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.qty}</span>
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="min-w-[80px] text-right font-bold">
                ₦{(item.price * item.qty).toLocaleString()}
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Discount Input */}
      <div className="mt-3 mb-2">
        <div className="flex items-center gap-2 p-2 border border-dashed rounded-md text-sm">
          <span className="text-muted-foreground">Discount:</span>
          <span className="font-medium">₦100</span>
          <Button variant="ghost" size="sm" className="ml-auto h-7 px-2">
            Edit
          </Button>
        </div>
      </div>
      
      <Button
        variant="destructive"
        size="sm"
        className="w-full mt-3"
      >
        Clear Cart
      </Button>
    </div>
  );
}
