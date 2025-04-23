
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

type TrialBalanceItem = {
  account_code: string;
  account_name: string;
  account_type: string;
  debit: number;
  credit: number;
  balance: number;
};

type TrialBalanceTabProps = {
  data: TrialBalanceItem[];
  period: string;
};

export function TrialBalanceTab({ data, period }: TrialBalanceTabProps) {
  const totals = data.reduce(
    (acc, item) => {
      acc.debit += item.debit;
      acc.credit += item.credit;
      return acc;
    },
    { debit: 0, credit: 0 }
  );

  return (
    <>
      <div className="p-4 border-b bg-muted/20">
        <h3 className="font-semibold text-lg">Trial Balance</h3>
        <p className="text-sm text-muted-foreground">Period: {period}</p>
      </div>
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
          </TableBody>
          <tfoot className="border-t bg-muted/50">
            <tr>
              <td colSpan={3} className="p-4 font-bold">Total</td>
              <td className="p-4 text-right font-mono font-bold">{totals.debit.toLocaleString()}</td>
              <td className="p-4 text-right font-mono font-bold">{totals.credit.toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
}
