
import { Button } from "@/components/ui/button";
import { EyeOff } from "lucide-react";

interface ReceiptPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiptPreviewDialog({ isOpen, onClose }: ReceiptPreviewDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Receipt Preview</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <EyeOff className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="border rounded-md p-6 bg-white">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                This is a preview using sample data
              </p>
            </div>

            {/* Mock receipt preview */}
            <div className="space-y-4 font-mono text-sm">
              <div className="text-center">
                <h2 className="font-bold">WASPER BUSINESS HUB</h2>
                <p>123 Business Avenue</p>
                <p>TIN: 123-456-789-000</p>
                <p>Tel: (123) 456-7890</p>
                <p>www.wasper.example.com</p>
              </div>
              
              <div className="text-center border-t border-b py-2">
                <p>Sales Receipt</p>
                <p>Receipt #: INV-123456</p>
                <p>Date: 24/04/2025 10:30 AM</p>
                <p>Cashier: John Doe</p>
              </div>
              
              <div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-1">Item</th>
                      <th className="py-1 text-right">Qty</th>
                      <th className="py-1 text-right">Price</th>
                      <th className="py-1 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">Product One</td>
                      <td className="py-1 text-right">2</td>
                      <td className="py-1 text-right">$10.00</td>
                      <td className="py-1 text-right">$20.00</td>
                    </tr>
                    <tr>
                      <td className="py-1">Product Two</td>
                      <td className="py-1 text-right">1</td>
                      <td className="py-1 text-right">$15.00</td>
                      <td className="py-1 text-right">$15.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>$35.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>$3.50</span>
                </div>
                <div className="flex justify-between font-bold border-t border-b py-1 my-1">
                  <span>Total:</span>
                  <span>$38.50</span>
                </div>
              </div>
              
              <div className="text-center pt-2">
                <p>Thank you for your purchase!</p>
                <p>Please come again!</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
