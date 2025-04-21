
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockFinancials = [
  {
    period: "2025-04",
    revenue: 320000,
    net_profit: 98000,
    expenses: 220000,
    gross_margin: "31%",
  },
  {
    period: "2025-03",
    revenue: 270000,
    net_profit: 70000,
    expenses: 200000,
    gross_margin: "26%",
  },
];

export default function FinancialReports() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Trial Balance &amp; P&amp;L</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Revenue (₦)</TableHead>
            <TableHead>Net Profit (₦)</TableHead>
            <TableHead>Expenses (₦)</TableHead>
            <TableHead>Gross Margin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockFinancials.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.period}</TableCell>
              <TableCell>₦{row.revenue.toLocaleString()}</TableCell>
              <TableCell>₦{row.net_profit.toLocaleString()}</TableCell>
              <TableCell>₦{row.expenses.toLocaleString()}</TableCell>
              <TableCell>{row.gross_margin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
