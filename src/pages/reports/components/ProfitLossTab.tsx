
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/ui/charts";

type ProfitLossItem = {
  category: string;
  item: string;
  amount: number;
};

type MonthlyProfitData = {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
};

type ProfitLossTabProps = {
  data: ProfitLossItem[];
  monthlyData: MonthlyProfitData[];
  period: string;
};

export function ProfitLossTab({ data, monthlyData, period }: ProfitLossTabProps) {
  const totals = data.reduce(
    (acc, item) => {
      if (item.category === "Revenue") {
        acc.revenue += item.amount;
      } else {
        acc.expenses += Math.abs(item.amount);
      }
      return acc;
    },
    { revenue: 0, expenses: 0 }
  );
  
  const netProfit = totals.revenue - totals.expenses;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
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
                {totals.expenses.toLocaleString()}
              </TableCell>
            </TableRow>

            {/* Net Profit/Loss */}
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableCell colSpan={2} className="font-bold">Net Profit</TableCell>
              <TableCell className={`text-right font-mono font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="h-80 flex flex-col">
        <h4 className="font-medium mb-2 text-center">6-Month Profit Trend</h4>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`₦${value.toLocaleString()}`, '']} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
