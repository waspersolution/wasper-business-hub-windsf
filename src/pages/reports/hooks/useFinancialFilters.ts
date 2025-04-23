
import { useState } from "react";

export function useFinancialFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("2025-04");
  const [accountType, setAccountType] = useState("all");

  return {
    searchTerm,
    setSearchTerm,
    period,
    setPeriod,
    accountType,
    setAccountType,
  };
}
