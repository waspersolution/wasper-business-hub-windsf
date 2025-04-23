
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import type { ProfitLossItem } from "../../types/financial-reports";

type ProfitLossTableProps = {
  data: ProfitLossItem[];
  totals: {
    revenue: number;
    expenses: number;
    netProfit: number;
  };
};

export function ProfitLossTable({ data, totals }: ProfitLossTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Amount (₦)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Revenue Section */}
          <TableRow className="bg-blue-50 dark:bg-blue-900/20">
            <TableCell colSpan={3} className="font-bold">Revenue</TableCell>
          </TableRow>
          {data
            .filter(item => item.category === "Revenue")
            .map((item, index) => (
              <TableRow key={`revenue-${index}`} className="hover:bg-muted/30">
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell className="text-right font-mono text-green-600">
                  {item.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          <TableRow className="bg-muted/30">
            <TableCell colSpan={2} className="font-semibold">Total Revenue</TableCell>
            <TableCell className="text-right font-mono font-semibold text-green-600">
              {totals.revenue.toLocaleString()}
            </TableCell>
          </TableRow>

          {/* Expenses Section */}
          <TableRow className="bg-red-50 dark:bg-red-900/20">
            <TableCell colSpan={3} className="font-bold">Expenses</TableCell>
          </TableRow>
          {data
            .filter(item => item.category === "Expenses")
            .map((item, index) => (
              <TableRow key={`expense-${index}`} className="hover:bg-muted/30">
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell className="text-right font-mono text-red-600">
                  {Math.abs(item.amount).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          <TableRow className="bg-muted/30">
            <TableCell colSpan={2} className="font-semibold">Total Expenses</TableCell>
            <TableCell className="text-right font-mono font-semibold text-red-600">
              {Math.abs(totals.expenses).toLocaleString()}
            </TableCell>
          </TableRow>

          {/* Net Profit/Loss */}
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableCell colSpan={2} className="font-bold">Net Profit</TableCell>
            <TableCell className={`text-right font-mono font-bold ${totals.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.netProfit.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
