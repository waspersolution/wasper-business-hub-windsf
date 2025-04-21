
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, DollarSign } from "lucide-react";

const mockPayments = [
  {
    date: "2024-03-14",
    invoice: "#INV-1001",
    method: "Credit Card",
    amount: 5000,
    status: "Paid",
  },
  {
    date: "2024-02-14",
    invoice: "#INV-0999",
    method: "Bank Transfer",
    amount: 5000,
    status: "Paid",
  },
  {
    date: "2024-01-14",
    invoice: "#INV-0970",
    method: "Credit Card",
    amount: 0,
    status: "Failed",
  },
];

export default function PaymentHistory() {
  return (
    <div className="pb-10">
      <div className="flex items-center gap-4 mb-4">
        <CreditCard className="text-wasper-primary" size={28} />
        <h1 className="text-xl font-bold">Payment History</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Invoice No</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount (₦)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((p, idx) => (
                <TableRow key={p.invoice}>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{p.invoice}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell className="font-semibold">
                    {p.amount === 0 ? "—" : `₦${p.amount.toLocaleString()}`}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${p.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"}`
                      }
                    >
                      {p.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
