
import type { MonthlyProfitData, MonthlyData } from "../types/financial-reports";

export function useChartTransformations() {
  const formatProfitChartData = (data: MonthlyProfitData[]) => {
    return data.map(item => ({
      ...item,
      month: item.month,
      revenue: item.revenue,
      expenses: Math.abs(item.expenses),
      profit: item.profit
    }));
  };

  const formatCashFlowChartData = (data: MonthlyData[]) => {
    return data.map(item => ({
      ...item,
      month: item.month,
      operating: item.operating,
      investing: Math.abs(item.investing),
      financing: Math.abs(item.financing),
      netCashFlow: item.netCashFlow
    }));
  };

  const tooltipFormatter = (value: number | string | Array<number | string>) => {
    const numValue = typeof value === 'number' ? value : 0;
    return [`₦${numValue < 0 ? '(' + Math.abs(numValue).toLocaleString() + ')' : numValue.toLocaleString()}`, ''];
  };

  return {
    formatProfitChartData,
    formatCashFlowChartData,
    tooltipFormatter
  };
}
