
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Check } from "lucide-react"; // Replace cash by DollarSign for cash payment icon

export default function POSSummary() {
  // Demo summary only
  const subtotal = 1350;
  const discount = 100;
  const total = subtotal - discount;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-wasper-primary">Summary</h2>
      <div className="mb-2 flex flex-col gap-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₦{discount.toLocaleString()}</span>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-wasper-primary text-base">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Button disabled className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Card Payment
        </Button>
        <Button disabled variant="secondary" className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Cash Payment
        </Button>
        <Button disabled variant="outline" className="flex items-center gap-2">
          <Check className="h-5 w-5" />
          Complete Sale
        </Button>
      </div>
    </div>
  );
}
