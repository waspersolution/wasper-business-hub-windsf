
import { TableRow, TableCell } from "@/components/ui/table";
import type { BalanceSheetItem } from "../../../types/financial-reports";

interface LiabilitiesSectionProps {
  liabilities: BalanceSheetItem[];
  filteredLiabilities: BalanceSheetItem[];
}

export function LiabilitiesSection({ liabilities, filteredLiabilities }: LiabilitiesSectionProps) {
  return (
    <>
      {/* Current Liabilities */}
      <TableRow className="bg-red-50 dark:bg-red-900/20">
        <TableCell colSpan={3} className="font-bold">Current Liabilities</TableCell>
      </TableRow>
      {filteredLiabilities
        .filter(item => item.category === "Current Liabilities")
        .map((item, index) => (
          <TableRow key={`liability-current-${index}`} className="hover:bg-muted/30">
            <TableCell></TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell className="text-right font-mono">
              {item.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      <TableRow className="bg-muted/30 border-t">
        <TableCell></TableCell>
        <TableCell className="font-semibold">Total Current Liabilities</TableCell>
        <TableCell className="text-right font-mono font-semibold">
          {filteredLiabilities
            .filter(item => item.category === "Current Liabilities")
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>

      {/* Long-term Liabilities */}
      <TableRow className="bg-orange-50 dark:bg-orange-900/20">
        <TableCell colSpan={3} className="font-bold">Long-term Liabilities</TableCell>
      </TableRow>
      {filteredLiabilities
        .filter(item => item.category === "Long-term Liabilities")
        .map((item, index) => (
          <TableRow key={`liability-lt-${index}`} className="hover:bg-muted/30">
            <TableCell></TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell className="text-right font-mono">
              {item.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      <TableRow className="bg-muted/30 border-t">
        <TableCell></TableCell>
        <TableCell className="font-semibold">Total Long-term Liabilities</TableCell>
        <TableCell className="text-right font-mono font-semibold">
          {filteredLiabilities
            .filter(item => item.category === "Long-term Liabilities")
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>

      {/* Total Liabilities */}
      <TableRow className="bg-red-100 dark:bg-red-800/40 font-bold">
        <TableCell></TableCell>
        <TableCell>TOTAL LIABILITIES</TableCell>
        <TableCell className="text-right font-mono">
          {filteredLiabilities
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>
    </>
  );
}
