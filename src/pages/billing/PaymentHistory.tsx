
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center gap-4 mb-6">
        <CreditCard className="text-wasper-primary" size={28} />
        <h1 className="text-xl font-bold">Payment History</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-500">Total Payments</div>
            <div className="text-2xl font-bold">₦10,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-500">Last Payment</div>
            <div className="text-2xl font-bold">₦5,000</div>
            <div className="text-xs text-gray-400">March 14, 2024</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-500">Next Payment Due</div>
            <div className="text-2xl font-bold">₦5,000</div>
            <div className="text-xs text-gray-400">April 14, 2024</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Your Payments</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter size={15} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download size={15} />
              Export
            </Button>
          </div>
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
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-wasper-primary h-8 px-2">
                      <Download size={15} /> 
                    </Button>
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
