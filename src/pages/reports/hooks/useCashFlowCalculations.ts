
import type { CashFlowItem } from "../types/financial-reports";

export function useCashFlowCalculations() {
  const getTotalByCategoryType = (data: CashFlowItem[], category: string) => {
    return data
      .filter(item => item.category === category && !item.isTotal)
      .reduce((acc, item) => acc + item.amount, 0);
  };

  return {
    getTotalByCategoryType
  };
}
