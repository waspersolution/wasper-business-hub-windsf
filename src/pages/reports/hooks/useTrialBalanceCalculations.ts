
import { type TrialBalanceItem } from "../types/financial-reports";

export function useTrialBalanceCalculations(data: TrialBalanceItem[]) {
  const totals = data.reduce(
    (acc, item) => {
      acc.debit += item.debit;
      acc.credit += item.credit;
      return acc;
    },
    { debit: 0, credit: 0 }
  );

  return { totals };
}
