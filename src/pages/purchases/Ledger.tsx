
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockPurchaseLedger = [
  {
    id: "PL001",
    supplier: "ABC Suppliers",
    type: "invoice",
    amount: 50000,
    paid: 25000,
    balance: 25000,
    date: "2025-04-01",
  },
  {
    id: "PL002",
    supplier: "XYZ Traders",
    type: "payment",
    amount: 47000,
    paid: 47000,
    balance: 0,
    date: "2025-04-11",
  },
];

export default function PurchasesLedger() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Purchases Ledger</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPurchaseLedger.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.id}</TableCell>
              <TableCell>{entry.supplier}</TableCell>
              <TableCell>
                <span className={entry.type === "invoice" ? "text-green-700" : "text-blue-700"}>
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                </span>
              </TableCell>
              <TableCell>₦{entry.amount.toLocaleString()}</TableCell>
              <TableCell>₦{entry.paid.toLocaleString()}</TableCell>
              <TableCell>₦{entry.balance.toLocaleString()}</TableCell>
              <TableCell>{entry.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
