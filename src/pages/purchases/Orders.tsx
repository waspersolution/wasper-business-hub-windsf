
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockOrders = [
  {
    id: "PO001",
    supplier: "ABC Suppliers",
    total: 95000,
    status: "pending",
    expected_delivery: "2025-04-25",
    created_at: "2025-04-19",
  },
  {
    id: "PO002",
    supplier: "XYZ Traders",
    total: 47400,
    status: "received",
    expected_delivery: "2025-04-10",
    created_at: "2025-04-08",
  },
];

export default function Orders() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Purchase Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expected Delivery</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.supplier}</TableCell>
              <TableCell>₦{order.total.toLocaleString()}</TableCell>
              <TableCell>
                <span className={order.status === "received" ? "text-green-700" : "text-yellow-700"}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{order.expected_delivery}</TableCell>
              <TableCell>{order.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
