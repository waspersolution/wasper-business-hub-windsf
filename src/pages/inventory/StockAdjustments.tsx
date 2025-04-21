
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Mock stock adjustment data
const mockAdjustments = [
  {
    id: "A001",
    product: "Premium Bag of Rice",
    type: "Add",
    quantity: 15,
    note: "Initial stock",
    user: "Chidi Okafor",
    date: "2025-01-09",
  },
  {
    id: "A002",
    product: "Cooking Oil - 5L",
    type: "Remove",
    quantity: 4,
    note: "Damaged bottles",
    user: "Bukola Adebimpe",
    date: "2025-02-10",
  },
  {
    id: "A003",
    product: "Spaghetti 500g",
    type: "Add",
    quantity: 30,
    note: "Restock",
    user: "John Doe",
    date: "2025-03-03",
  },
];

export default function StockAdjustments() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Adjustments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adjustment ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>By</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAdjustments.map((adj) => (
            <TableRow key={adj.id}>
              <TableCell>{adj.id}</TableCell>
              <TableCell>{adj.product}</TableCell>
              <TableCell>
                <span className={adj.type === "Add" ? "text-green-700" : "text-red-700"}>
                  {adj.type}
                </span>
              </TableCell>
              <TableCell>{adj.quantity}</TableCell>
              <TableCell>{adj.note}</TableCell>
              <TableCell>{adj.user}</TableCell>
              <TableCell>{adj.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
