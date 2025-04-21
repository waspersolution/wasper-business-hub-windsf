
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockSales = [
  {
    id: "S001",
    customer: "Acme Corp",
    total: 12000,
    payment_method: "card",
    status: "completed",
    created_at: "2025-04-21",
  },
  {
    id: "S002",
    customer: "Jane Doe",
    total: 5000,
    payment_method: "cash",
    status: "pending",
    created_at: "2025-04-21",
  },
  {
    id: "S003",
    customer: "XYZ Foods",
    total: 6700,
    payment_method: "transfer",
    status: "completed",
    created_at: "2025-04-20",
  }
];

export default function POS() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Point of Sale (POS)</h1>
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
          {mockSales.map((sale) => (
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
