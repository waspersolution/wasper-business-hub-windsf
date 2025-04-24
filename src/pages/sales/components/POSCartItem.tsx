
import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    qty: number;
  };
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemoveItem: (id: number) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function POSCartItem({ item, onUpdateQuantity, onRemoveItem, onKeyDown }: CartItemProps) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-b-0 focus:bg-wasper-light focus:outline-none rounded"
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="button"
      aria-label={`${item.name}, quantity: ${item.qty}, price: ${item.price} naira per unit`}
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
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.qty - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm">{item.qty}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6 rounded-full"
            onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
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
          onClick={() => onRemoveItem(item.id)}
          aria-label={`Remove ${item.name} from cart`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
