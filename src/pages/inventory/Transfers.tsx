
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Mock transfers data
const mockTransfers = [
  {
    id: "T001",
    product: "Premium Bag of Rice",
    qty: 10,
    from: "Main Warehouse",
    to: "Apapa Branch",
    user: "Chidi Okafor",
    date: "2025-02-28",
    status: "Completed",
  },
  {
    id: "T002",
    product: "Cooking Oil - 5L",
    qty: 5,
    from: "Main Warehouse",
    to: "Ikeja Branch",
    user: "Adekunle George",
    date: "2025-03-03",
    status: "Pending",
  },
  {
    id: "T003",
    product: "Spaghetti 500g",
    qty: 20,
    from: "Ikeja Branch",
    to: "Lekki Branch",
    user: "Bukola Adebimpe",
    date: "2025-03-08",
    status: "Completed",
  },
];

export default function Transfers() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Transfers</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transfer ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransfers.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.id}</TableCell>
              <TableCell>{t.product}</TableCell>
              <TableCell>{t.qty}</TableCell>
              <TableCell>{t.from}</TableCell>
              <TableCell>{t.to}</TableCell>
              <TableCell>{t.user}</TableCell>
              <TableCell>{t.date}</TableCell>
              <TableCell>
                <span className={t.status === "Completed" ? "text-green-700" : "text-yellow-700"}>
                  {t.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
