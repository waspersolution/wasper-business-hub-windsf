
import { useState, useMemo } from 'react';
import type { TrialBalanceItem } from "../types/financial-reports";
import { useTrialBalanceCalculations } from "./useTrialBalanceCalculations";

export function useTrialBalance(data: TrialBalanceItem[]) {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState<string>("all");

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesAccountType = accountType === "all" || 
        item.account_type.toLowerCase() === accountType.toLowerCase();
      
      const matchesSearch = searchTerm === "" || 
        item.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.account_code.includes(searchTerm);
      
      return matchesAccountType && matchesSearch;
    });
  }, [data, searchTerm, accountType]);

  const { totals, isBalanced } = useTrialBalanceCalculations(filteredData);

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
