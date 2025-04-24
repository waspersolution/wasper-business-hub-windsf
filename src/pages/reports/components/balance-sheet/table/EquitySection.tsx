
import { TableRow, TableCell } from "@/components/ui/table";
import type { BalanceSheetItem } from "../../../types/financial-reports";

interface EquitySectionProps {
  equity: BalanceSheetItem[];
  filteredEquity: BalanceSheetItem[];
  totalLiabilities: number;
}

export function EquitySection({ equity, filteredEquity, totalLiabilities }: EquitySectionProps) {
  return (
    <>
      {filteredEquity.map((item, index) => (
        <TableRow key={`equity-${index}`} className="hover:bg-muted/30">
          <TableCell></TableCell>
          <TableCell>{item.item}</TableCell>
          <TableCell className="text-right font-mono">
            {item.amount.toLocaleString()}
          </TableCell>
        </TableRow>
      ))}

      {/* Total Equity */}
      <TableRow className="bg-green-100 dark:bg-green-800/40 font-bold">
        <TableCell></TableCell>
        <TableCell>TOTAL EQUITY</TableCell>
        <TableCell className="text-right font-mono">
          {filteredEquity
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>

      {/* Total Liabilities and Equity */}
      <TableRow className="bg-gray-200 dark:bg-gray-700 font-bold text-lg">
        <TableCell></TableCell>
        <TableCell>TOTAL LIABILITIES AND EQUITY</TableCell>
        <TableCell className="text-right font-mono">
          {(totalLiabilities + 
            filteredEquity.reduce((sum, item) => sum + item.amount, 0)).toLocaleString()}
        </TableCell>
      </TableRow>
    </>
  );
}
