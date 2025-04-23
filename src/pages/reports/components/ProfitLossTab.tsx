
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/ui/charts";
import { ProfitLossTable } from "./tables/ProfitLossTable";
import { useChartTransformations } from "../hooks/useChartTransformations";
import type { ProfitLossItem, MonthlyProfitData } from "../types/financial-reports";

type ProfitLossTabProps = {
  data: ProfitLossItem[];
  monthlyData: MonthlyProfitData[];
  period: string;
};

export function ProfitLossTab({ data, monthlyData, period }: ProfitLossTabProps) {
  const { formatProfitChartData, tooltipFormatter } = useChartTransformations();
  
  const totals = data.reduce(
    (acc, item) => {
      if (item.category === "Revenue") {
        acc.revenue += item.amount;
      } else {
        acc.expenses += Math.abs(item.amount);
      }
      return acc;
    },
    { revenue: 0, expenses: 0, netProfit: 0 }
  );
  
  totals.netProfit = totals.revenue - totals.expenses;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div className="overflow-x-auto">
        <ProfitLossTable data={data} totals={totals} />
      </div>

      <div className="h-80 flex flex-col">
        <h4 className="font-medium mb-2 text-center">6-Month Profit Trend</h4>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formatProfitChartData(monthlyData)}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
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
