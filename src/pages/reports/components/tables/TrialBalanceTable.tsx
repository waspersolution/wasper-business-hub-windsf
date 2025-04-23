
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { type TrialBalanceItem } from "../../types/financial-reports";
import { useTrialBalanceCalculations } from "../../hooks/useTrialBalanceCalculations";

type TrialBalanceTableProps = {
  data: TrialBalanceItem[];
};

export function TrialBalanceTable({ data }: TrialBalanceTableProps) {
  const { totals } = useTrialBalanceCalculations(data);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead>Account Code</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Debit (₦)</TableHead>
            <TableHead className="text-right">Credit (₦)</TableHead>
            <TableHead className="text-right">Balance (₦)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="hover:bg-muted/30">
              <TableCell>{item.account_code}</TableCell>
              <TableCell className="font-medium">{item.account_name}</TableCell>
              <TableCell>{item.account_type}</TableCell>
              <TableCell className="text-right font-mono">
                {item.debit > 0 ? item.debit.toLocaleString() : "—"}
              </TableCell>
              <TableCell className="text-right font-mono">
                {item.credit > 0 ? item.credit.toLocaleString() : "—"}
              </TableCell>
              <TableCell className={`text-right font-mono ${item.balance < 0 ? "text-red-600" : "text-green-600"}`}>
                {item.balance.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          <tr className="border-t bg-muted/50">
            <td colSpan={3} className="p-4 font-bold">Total</td>
            <td className="p-4 text-right font-mono font-bold">{totals.debit.toLocaleString()}</td>
            <td className="p-4 text-right font-mono font-bold">{totals.credit.toLocaleString()}</td>
            <td></td>
          </tr>
        </TableBody>
      </Table>
    </div>
  );
}
