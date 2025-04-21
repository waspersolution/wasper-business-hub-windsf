
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockDeadStock = [
  {
    product: "Old Maize Flour",
    sku: "MZFR001",
    stock: 10,
    branch: "Main Warehouse",
    last_movement: "2024-12-13",
  },
  {
    product: "Stale Beans",
    sku: "BEANX",
    stock: 5,
    branch: "Apapa Branch",
    last_movement: "2024-11-28",
  },
];

export default function DeadStock() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dead Stock Report</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Last Movement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockDeadStock.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.branch}</TableCell>
              <TableCell>{item.last_movement}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
