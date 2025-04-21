
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockReceipts = [
  {
    id: "GR001",
    supplier: "ABC Suppliers",
    order_id: "PO001",
    date_received: "2025-04-20",
    received_by: "Jane Smith",
    status: "checked",
  },
  {
    id: "GR002",
    supplier: "XYZ Traders",
    order_id: "PO002",
    date_received: "2025-04-11",
    received_by: "John Doe",
    status: "pending",
  },
];

export default function GoodsReceived() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Goods Received</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>GRN ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Received</TableHead>
            <TableHead>Received By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReceipts.map((grn) => (
            <TableRow key={grn.id}>
              <TableCell>{grn.id}</TableCell>
              <TableCell>{grn.supplier}</TableCell>
              <TableCell>{grn.order_id}</TableCell>
              <TableCell>
                <span className={grn.status === "checked" ? "text-green-700" : "text-yellow-700"}>
                  {grn.status.charAt(0).toUpperCase() + grn.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{grn.date_received}</TableCell>
              <TableCell>{grn.received_by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
