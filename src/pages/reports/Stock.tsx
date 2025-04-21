
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockStockReport = [
  {
    product: "Premium Bag of Rice",
    sku: "RBAG5000",
    qty: 23,
    value: 644000,
    branch: "Main Warehouse",
  },
  {
    product: "Cooking Oil - 5L",
    sku: "COIL5L",
    qty: 17,
    value: 161500,
    branch: "Apapa Branch",
  },
];

export default function StockReports() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Reports</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Value (₦)</TableHead>
            <TableHead>Branch</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockStockReport.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>₦{item.value.toLocaleString()}</TableCell>
              <TableCell>{item.branch}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
