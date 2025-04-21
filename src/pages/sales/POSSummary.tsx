
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Check, UserPlus, ChevronDown } from "lucide-react";

interface POSSummaryProps {
  onComplete?: () => void;
}

export default function POSSummary({ onComplete }: POSSummaryProps) {
  // Demo summary only
  const subtotal = 1350;
  const discount = 100;
  const total = subtotal - discount;

  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-wasper-primary">Payment</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-red-500">-₦{discount.toLocaleString()}</span>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-wasper-primary text-lg">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Cash
        </Button>
        <Button variant="secondary" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Card
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <Button variant="outline" className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Add Customer</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
        
        <Button 
          onClick={handleComplete}
          variant="default" 
          className="w-full flex items-center justify-center gap-2 mt-2 bg-gradient-to-r from-wasper-primary to-wasper-accent"
        >
          <Check className="h-5 w-5" />
          Complete Sale
        </Button>
      </div>
    </div>
  );
}
