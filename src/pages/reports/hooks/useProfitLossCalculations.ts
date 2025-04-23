
import { type ProfitLossItem } from "../types/financial-reports";

export function useProfitLossCalculations(data: ProfitLossItem[]) {
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

  return { totals, netProfit };
}
