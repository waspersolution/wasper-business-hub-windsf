
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockSalesHistory = [
  {
    id: "S001",
    customer: "Acme Corp",
    total: 12000,
    payment_method: "card",
    status: "completed",
    created_at: "2025-04-21",
  },
  {
    id: "S004",
    customer: "Delta Ltd",
    total: 8000,
    payment_method: "cash",
    status: "cancelled",
    created_at: "2025-04-20",
  },
  {
    id: "S002",
    customer: "Jane Doe",
    total: 5000,
    payment_method: "cash",
    status: "pending",
    created_at: "2025-04-21",
  },
];

export default function SalesHistory() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sale ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSalesHistory.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.customer}</TableCell>
              <TableCell>₦{sale.total.toLocaleString()}</TableCell>
              <TableCell>{sale.payment_method}</TableCell>
              <TableCell>
                <span
                  className={
                    sale.status === "completed"
                      ? "text-green-700"
                      : sale.status === "pending"
                      ? "text-yellow-700"
                      : sale.status === "cancelled"
                      ? "text-red-700"
                      : "text-gray-700"
                  }
                >
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{sale.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
