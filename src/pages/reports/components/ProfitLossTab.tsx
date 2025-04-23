import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/charts";

// Mock data for profit and loss
const profitLossData = [
  { name: 'Jan', revenue: 120000, expenses: 80000, profit: 40000 },
  { name: 'Feb', revenue: 150000, expenses: 95000, profit: 55000 },
  { name: 'Mar', revenue: 185000, expenses: 110000, profit: 75000 },
  { name: 'Apr', revenue: 220000, expenses: 130000, profit: 90000 },
  { name: 'May', revenue: 195000, expenses: 125000, profit: 70000 },
  { name: 'Jun', revenue: 240000, expenses: 145000, profit: 95000 }
];

export function ProfitLossTab() {
  return (
    <div className="grid gap-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Profit & Loss Analysis</CardTitle>
          <CardDescription>Monthly revenue, expenses, and profit overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitLossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₦${value.toLocaleString()}`}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
