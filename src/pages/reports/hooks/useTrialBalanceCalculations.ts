
import { useMemo } from 'react';
import type { TrialBalanceItem } from "../types/financial-reports";

export function useTrialBalanceCalculations(data: TrialBalanceItem[]) {
  const totals = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        acc.debit += item.debit;
        acc.credit += item.credit;
        return acc;
      },
      { debit: 0, credit: 0 }
    );
  }, [data]);

  const isBalanced = useMemo(() => {
    return Math.abs(totals.debit - totals.credit) < 0.01;
  }, [totals]);

  return {
    totals,
    isBalanced
  };
}
