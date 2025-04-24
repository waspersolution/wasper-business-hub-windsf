
import { useState } from 'react';
import type { TrialBalanceItem } from "../types/financial-reports";

export function useTrialBalanceReporting(data: TrialBalanceItem[]) {
  const [period, setPeriod] = useState("2025-04");
  const [accountType, setAccountType] = useState<string>("all");

  const filteredData = data.filter(item => 
    accountType === "all" || item.account_type.toLowerCase() === accountType.toLowerCase()
  );

  const totals = filteredData.reduce(
    (acc, item) => {
      acc.debit += item.debit;
      acc.credit += item.credit;
      acc.balance += item.balance;
      return acc;
    },
    { debit: 0, credit: 0, balance: 0 }
  );

  const isBalanced = Math.abs(totals.debit - totals.credit) < 0.01;

  return {
    period,
    setPeriod,
    accountType,
    setAccountType,
    filteredData,
    totals,
    isBalanced
  };
}
