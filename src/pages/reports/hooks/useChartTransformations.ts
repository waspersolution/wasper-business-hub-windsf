
import type { MonthlyProfitData } from "../types/financial-reports";

export function useChartTransformations() {
  const tooltipFormatter = (value: number | string | Array<number | string>): [string, string] => {
    const formattedValue = typeof value === 'number' ? 
      `₦${value.toLocaleString()}` : 
      Array.isArray(value) ? `₦${value[0].toLocaleString()}` : value.toString();
    return [formattedValue, ''];
  };

  const formatProfitChartData = (data: MonthlyProfitData[]) => {
    return data.map(item => ({
      ...item,
      profitMargin: ((item.profit / item.revenue) * 100).toFixed(1),
      revenueGrowth: calculateGrowth(item.revenue, data),
      profitGrowth: calculateGrowth(item.profit, data),
      expenseRatio: ((item.expenses / item.revenue) * 100).toFixed(1)
    }));
  };

  const calculateGrowth = (currentValue: number, data: MonthlyProfitData[], index?: number) => {
    const currentIndex = index ?? data.length - 1;
    if (currentIndex === 0) return 0;
    const previousValue = data[currentIndex - 1].revenue;
    return previousValue ? ((currentValue - previousValue) / previousValue * 100).toFixed(1) : 0;
  };

  return {
    tooltipFormatter,
    formatProfitChartData
  };
}
