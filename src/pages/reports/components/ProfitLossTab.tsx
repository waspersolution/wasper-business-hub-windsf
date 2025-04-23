import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ProfitLossItem, MonthlyProfitData } from "../types/financial-reports";

interface ProfitLossTabProps {
  data: ProfitLossItem[];
  monthlyData: MonthlyProfitData[];
  period: string;
}

export function ProfitLossTab({ data, monthlyData, period }: ProfitLossTabProps) {
  const calculateTotal = (category: string) => {
    return data
      .filter((item) => item.category === category)
      .reduce((acc, item) => acc + item.amount, 0);
  };

  const totalRevenue = calculateTotal("Revenue");
  const totalExpenses = calculateTotal("Expenses");
  const netProfit = totalRevenue + totalExpenses; // Expenses are negative

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Category</TableHead>
          <TableHead>Item</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.item}>
            <TableCell className="font-medium">{item.category}</TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell className="text-right">{`₦${item.amount.toLocaleString()}`}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Total Revenue
          </TableCell>
          <TableCell className="text-right font-medium">{`₦${totalRevenue.toLocaleString()}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Total Expenses
          </TableCell>
          <TableCell className="text-right font-medium">{`₦${totalExpenses.toLocaleString()}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="font-bold">
            Net Profit
          </TableCell>
          <TableCell className="text-right font-bold">{`₦${netProfit.toLocaleString()}`}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
