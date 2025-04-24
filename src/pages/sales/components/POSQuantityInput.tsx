
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface POSQuantityInputProps {
  quantity: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddToCart: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  disabled?: boolean;
}

export default function POSQuantityInput({
  quantity,
  onQuantityChange,
  onKeyDown,
  onAddToCart,
  inputRef,
  buttonRef,
  disabled
}: POSQuantityInputProps) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex gap-2 items-center">
      <div className="flex-1">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
          onKeyDown={onKeyDown}
          ref={inputRef}
          aria-label="Product quantity"
        />
      </div>
      <div className="flex items-end">
        <Button 
          onClick={onAddToCart}
          ref={buttonRef}
          disabled={disabled}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
