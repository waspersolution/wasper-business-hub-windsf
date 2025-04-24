
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface POSReceiptProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: any[];
  onClose: () => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export default function POSReceipt({ isOpen, onOpenChange, cartItems, onClose, searchInputRef }: POSReceiptProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receipt #12345</DialogTitle>
        </DialogHeader>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-center mb-4">
            <h3 className="font-bold text-lg">Wasper Business</h3>
            <p className="text-sm text-gray-500">123 Main Street, City</p>
            <p className="text-sm text-gray-500">Tel: +234 123 4567</p>
            <p className="text-sm text-gray-500">Date: {new Date().toLocaleString()}</p>
          </div>
          
          <div className="border-t border-b py-2 my-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Item</span>
              <span>Total</span>
            </div>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm mt-1">
                <div>
                  <p>{item.name}</p>
                  <p className="text-xs text-gray-500">{item.qty} × ₦{item.price}</p>
                </div>
                <span>₦{(item.qty * item.price).toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₦{cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-₦0</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₦{cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Payment Method:</span>
              <span>Cash</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onClose();
                  setTimeout(() => {
                    searchInputRef.current?.focus();
                  }, 10);
                }
              }}
            >
              Print
            </Button>
            <Button variant="outline" size="sm">
              Download
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClose}
              autoFocus
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
