
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  DollarSign, 
  Check, 
  UserPlus, 
  ChevronDown, 
  Save 
} from "lucide-react";
import { useState } from "react";
import POSPaymentPanel from "./POSPaymentPanel";

interface POSSummaryProps {
  subtotal?: number;
  discount?: number;
  total?: number; 
  onComplete?: () => void;
  onSaveAsDraft?: () => void;
  customerGroupDiscount?: number;
  paymentMethodRef?: React.RefObject<HTMLButtonElement>;
  completeButtonRef?: React.RefObject<HTMLButtonElement>;
}

export default function POSSummary({ 
  subtotal = 1350, 
  discount = 100, 
  total = subtotal - discount,
  onComplete,
  onSaveAsDraft,
  customerGroupDiscount = 0,
  paymentMethodRef,
  completeButtonRef
}: POSSummaryProps) {
  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"cash" | "card">("cash");

  const handleComplete = () => {
    if (onComplete) onComplete();
  };
  
  const handleSaveAsDraft = () => {
    if (onSaveAsDraft) onSaveAsDraft();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-wasper-primary">Payment</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        
        {customerGroupDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Group Discount ({customerGroupDiscount}%)</span>
            <span>-₦{((subtotal * customerGroupDiscount) / 100).toLocaleString()}</span>
          </div>
        )}
        
        {discount > 0 && (
          <div className="flex justify-between">
            <span>Additional Discount</span>
            <span className="text-red-500">-₦{discount.toLocaleString()}</span>
          </div>
        )}
        
        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-wasper-primary text-lg">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Payment method">
        <Button 
          className={`flex items-center gap-2 ${selectedPaymentMethod === 'cash' ? 'ring-2 ring-wasper-primary' : ''}`}
          onClick={() => setSelectedPaymentMethod("cash")}
          aria-checked={selectedPaymentMethod === 'cash'}
          role="radio"
          tabIndex={0}
          ref={paymentMethodRef}
        >
          <DollarSign className="h-4 w-4" />
          Cash
        </Button>
        <Button 
          variant={selectedPaymentMethod === 'card' ? "default" : "secondary"} 
          className={`flex items-center gap-2 ${selectedPaymentMethod === 'card' ? 'ring-2 ring-wasper-primary' : ''}`}
          onClick={() => setSelectedPaymentMethod("card")}
          aria-checked={selectedPaymentMethod === 'card'}
          role="radio"
          tabIndex={0}
        >
          <CreditCard className="h-4 w-4" />
          Card
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <Button 
          variant="outline" 
          className="flex items-center justify-between"
          aria-haspopup="true"
        >
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Add Customer</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={handleSaveAsDraft} 
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            Park Sale
          </Button>
          
          <Button 
            onClick={handleComplete}
            variant="default" 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-wasper-primary to-wasper-accent"
            ref={completeButtonRef}
          >
            <Check className="h-4 w-4" />
            Complete
          </Button>
        </div>
      </div>
      
      <POSPaymentPanel
        open={isPaymentPanelOpen}
        onOpenChange={setIsPaymentPanelOpen}
        totalDue={total}
      />
    </div>
  );
}
