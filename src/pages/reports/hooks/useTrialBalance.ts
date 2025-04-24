
import { useState } from 'react';
import type { TrialBalanceItem } from "../types/financial-reports";

export function useTrialBalance(data: TrialBalanceItem[]) {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState<string>("all");

  const filteredData = data.filter(item => {
    const matchesAccountType = accountType === "all" || 
      item.account_type.toLowerCase() === accountType.toLowerCase();
    
    const matchesSearch = searchTerm === "" || 
      item.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.account_code.includes(searchTerm);
    
    return matchesAccountType && matchesSearch;
  });

  const totals = filteredData.reduce(
    (acc, item) => {
      acc.debit += item.debit;
      acc.credit += item.credit;
      return acc;
    },
    { debit: 0, credit: 0 }
  );

  const isBalanced = Math.abs(totals.debit - totals.credit) < 0.01;

  return {
    period,
    setPeriod,
    searchTerm,
    setSearchTerm,
    accountType,
    setAccountType,
    filteredData,
    totals,
    isBalanced
  };
}

