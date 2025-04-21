
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const mockCart = [
  { id: 1, name: "Coca-Cola 50cl", price: 200, qty: 2 },
  { id: 2, name: "Bread Sliced 600g", price: 950, qty: 1 }
];

export default function POSCart() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-wasper-primary">Cart</h2>
      <div className="mb-2">
        {mockCart.length === 0 && (
          <div className="text-sm text-muted-foreground">Cart is empty</div>
        )}
        {mockCart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">
                ₦{item.price.toLocaleString()} × {item.qty}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="min-w-[70px] text-right font-bold">
                ₦{(item.price * item.qty).toLocaleString()}
              </div>
              <Button variant="ghost" size="icon" className="ml-1" disabled>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="destructive"
        size="sm"
        className="w-full"
        disabled
      >
        Clear Cart
      </Button>
    </div>
  );
}
