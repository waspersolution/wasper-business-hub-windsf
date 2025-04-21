
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Sale = {
  id: string;
  customer: string;
  customer_id: string;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
  items: number;
  invoice_number: string;
  staff: string;
};

type SaleDetailsDialogProps = {
  sale: Sale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SaleDetailsDialog({
  sale,
  open,
  onOpenChange,
}: SaleDetailsDialogProps) {
  if (!sale) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText size={20} />
            Sale Details - {sale.invoice_number}
          </DialogTitle>
          <DialogDescription>
            Sale {sale.id} for {sale.customer} on {sale.created_at}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Customer</div>
                <div className="font-medium">{sale.customer}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-medium">{sale.created_at}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Status</div>
                <div>
                  <Badge
                    variant={
                      sale.status === "completed"
                        ? "success"
                        : sale.status === "pending"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {sale.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Payment Method</div>
                <div className="font-medium capitalize">{sale.payment_method}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Processed By</div>
                <div className="font-medium">{sale.staff}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Total Items</div>
                <div className="font-medium">{sale.items}</div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between pt-2">
              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-xl font-bold">₦{sale.total.toLocaleString()}</div>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Print Invoice
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="items">
            <div className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* TODO: Replace with real sale items */}
                  <TableRow>
                    <TableCell>Sample Product 1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>₦2,000</TableCell>
                    <TableCell>₦4,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sample Product 2</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>₦8,000</TableCell>
                    <TableCell>₦8,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{sale.created_at}</TableCell>
                    <TableCell className="capitalize">{sale.payment_method}</TableCell>
                    <TableCell>₦{sale.total.toLocaleString()}</TableCell>
                    <TableCell>REF-{sale.id}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
