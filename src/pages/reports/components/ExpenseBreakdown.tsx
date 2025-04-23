
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ProfitLossItem } from "../types/financial-reports";

interface ExpenseBreakdownProps {
  expenses: ProfitLossItem[];
  totalExpenses: number;
}

export function ExpenseBreakdown({ expenses, totalExpenses }: ExpenseBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense, index) => {
            const percentage = Math.abs(expense.amount) / Math.abs(totalExpenses) * 100;
            return (
              <div key={`exp-breakdown-${index}`} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{expense.item}</span>
                  <span className="font-medium">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
