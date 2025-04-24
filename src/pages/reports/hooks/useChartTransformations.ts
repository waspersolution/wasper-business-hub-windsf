
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
      profitMargin: ((item.profit / item.revenue) * 100).toFixed(1)
    }));
  };

  return {
    tooltipFormatter,
    formatProfitChartData
  };
}
