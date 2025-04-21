
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockSalesReport = [
  {
    period: "2025-04",
    total_sales: 220000,
    total_orders: 34,
    avg_value: 6470,
    top_product: "Premium Bag of Rice",
  },
  {
    period: "2025-03",
    total_sales: 185000,
    total_orders: 29,
    avg_value: 6379,
    top_product: "Spaghetti 500g",
  },
];

export default function SalesReports() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales Reports</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Total Sales (₦)</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Avg Order Value</TableHead>
            <TableHead>Top Product</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSalesReport.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.period}</TableCell>
              <TableCell>₦{row.total_sales.toLocaleString()}</TableCell>
              <TableCell>{row.total_orders}</TableCell>
              <TableCell>₦{row.avg_value.toLocaleString()}</TableCell>
              <TableCell>{row.top_product}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
