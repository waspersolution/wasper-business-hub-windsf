
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockReconciliation = [
  {
    id: "RC001",
    account: "Bank - GTB",
    period: "2025-04",
    opening_balance: 500000,
    closing_balance: 535000,
    date: "2025-04-19",
    status: "matched",
  },
  {
    id: "RC002",
    account: "Bank - Access",
    period: "2025-04",
    opening_balance: 95000,
    closing_balance: 85500,
    date: "2025-04-19",
    status: "unmatched",
  },
];

export default function Reconciliation() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Reconciliation</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Opening Balance</TableHead>
            <TableHead>Closing Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReconciliation.map((rec) => (
            <TableRow key={rec.id}>
              <TableCell>{rec.id}</TableCell>
              <TableCell>{rec.account}</TableCell>
              <TableCell>{rec.period}</TableCell>
              <TableCell>₦{rec.opening_balance.toLocaleString()}</TableCell>
              <TableCell>₦{rec.closing_balance.toLocaleString()}</TableCell>
              <TableCell>
                <span className={rec.status === "matched" ? "text-green-700" : "text-red-700"}>
                  {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{rec.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
