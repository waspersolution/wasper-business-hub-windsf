
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockCustomers = [
  {
    id: "C001",
    name: "Acme Corp",
    email: "acme@example.com",
    phone: "+23480000001",
    address: "1 Acme Lane, Ikeja, Lagos",
    created_at: "2025-01-04",
  },
  {
    id: "C002",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+23480000002",
    address: "21 Freedom St., Abuja",
    created_at: "2025-02-15",
  },
  {
    id: "C003",
    name: "XYZ Foods",
    email: "contact@xyzfoods.com",
    phone: "+23480000003",
    address: "55 Unity Rd., Ibadan",
    created_at: "2025-03-19",
  },
];

export default function SalesCustomers() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
