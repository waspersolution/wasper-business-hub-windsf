
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockSuppliers = [
  {
    id: "SUP001",
    name: "ABC Suppliers",
    contact: "abc_suppliers@gmail.com",
    phone: "+23480000123",
    products: 12,
    created_at: "2025-03-01",
  },
  {
    id: "SUP002",
    name: "XYZ Traders",
    contact: "xyz_traders@gmail.com",
    phone: "+23480000456",
    products: 7,
    created_at: "2025-03-12",
  },
];

export default function Suppliers() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Suppliers</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Products Supplied</TableHead>
            <TableHead>Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSuppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.id}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.contact}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.products}</TableCell>
              <TableCell>{supplier.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
