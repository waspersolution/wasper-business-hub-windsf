
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Check, UserPlus, ChevronDown, Save, Clock, ShoppingCart } from "lucide-react";
import POSPaymentPanel from "./components/POSPaymentPanel";
import { useState } from "react";
import { useBranchSelection } from "@/hooks/use-branch-selection";

interface POSSummaryProps {
  subtotal?: number;
  discount?: number;
  total?: number; 
  onComplete?: () => void;
  onSaveAsDraft?: () => void;
  customerGroupDiscount?: number;
}

export default function POSSummary({ 
  subtotal = 1350, 
  discount = 100, 
  total = subtotal - discount,
  onComplete,
  onSaveAsDraft,
  customerGroupDiscount = 0
}: POSSummaryProps) {
  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false);
  const { currentBranch } = useBranchSelection();

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
        {currentBranch && (
          <div className="flex justify-between text-xs bg-slate-50 p-2 rounded">
            <span>Current Branch:</span>
            <span className="font-medium">{currentBranch.name}</span>
          </div>
        )}
        
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
      
      <div className="w-full">
        <Button
          variant="default"
          className="w-full flex items-center gap-2 bg-gradient-to-r from-wasper-primary to-wasper-accent"
          onClick={() => setIsPaymentPanelOpen(true)}
        >
          Complete with Multiple Payment
        </Button>
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
