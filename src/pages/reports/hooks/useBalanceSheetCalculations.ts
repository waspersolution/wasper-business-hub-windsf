
import { useState } from "react";
import { BalanceSheetData, BalanceSheetItem } from "../types/balance-sheet";

export function useBalanceSheetCalculations(balanceSheetData: BalanceSheetData) {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate totals
  const totalAssets = balanceSheetData.assets.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = balanceSheetData.liabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalEquity = balanceSheetData.equity.reduce((sum, item) => sum + item.amount, 0);
  const liabilitiesAndEquity = totalLiabilities + totalEquity;

  // Filter data based on search term
  const filteredAssets = balanceSheetData.assets.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredLiabilities = balanceSheetData.liabilities.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredEquity = balanceSheetData.equity.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));

  return {
    searchTerm,
    setSearchTerm,
    totalAssets,
    totalLiabilities,
    totalEquity,
    liabilitiesAndEquity,
    filteredAssets,
    filteredLiabilities,
    filteredEquity,
  };
}
