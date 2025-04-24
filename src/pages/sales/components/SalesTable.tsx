
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from 'react';
import { getStatusColor, getPaymentMethodDisplay } from "./salesTableUtils";
import { Sale } from "@/types/sales";

type SalesTableProps = {
  sales: Sale[];
  onView: (sale: Sale) => void;
};

export function SalesTable({ sales, onView }: SalesTableProps) {
  const handleRowClick = (sale: Sale) => {
    onView(sale);
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>, 
    sale: Sale
  ) => {
    e.stopPropagation();
    onView(sale);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden lg:table-cell">Payment</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale: Sale) => (
            <TableRow 
              key={sale.id} 
              className="cursor-pointer hover:bg-muted/50" 
              onClick={() => handleRowClick(sale)}
            >
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.invoice_number}</TableCell>
              <TableCell>{sale.customer_id}</TableCell>
              <TableCell className="hidden md:table-cell">{sale.created_at}</TableCell>
              <TableCell className="hidden lg:table-cell">{getPaymentMethodDisplay(sale.payment_method)}</TableCell>
              <TableCell>₦{sale.total.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(sale.status)}>
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleButtonClick(e, sale)} 
                  variant="outline" 
                  size="sm"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
