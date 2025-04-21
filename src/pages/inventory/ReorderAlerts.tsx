
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Mock reorder alerts data
const mockReorderAlerts = [
  {
    id: "R001",
    product: "Premium Bag of Rice",
    sku: "RBAG5000",
    stock: 2,
    reorder_level: 10,
    suggested_qty: 20,
    last_restock: "2025-02-05",
  },
  {
    id: "R002",
    product: "Cooking Oil - 5L",
    sku: "COIL5L",
    stock: 4,
    reorder_level: 6,
    suggested_qty: 10,
    last_restock: "2025-02-25",
  },
];

export default function ReorderAlerts() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Reorder Alerts</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Reorder Level</TableHead>
            <TableHead>Suggested Qty</TableHead>
            <TableHead>Last Restock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReorderAlerts.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>
                <span className={item.stock <= item.reorder_level ? "text-red-700 font-semibold" : ""}>
                  {item.stock}
                </span>
              </TableCell>
              <TableCell>{item.reorder_level}</TableCell>
              <TableCell>{item.suggested_qty}</TableCell>
              <TableCell>{item.last_restock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
