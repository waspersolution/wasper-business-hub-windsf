
import type { ProfitLossItem, MonthlyProfitData } from "../types/financial-reports";

export const profitLossData: ProfitLossItem[] = [
  { category: "Revenue", item: "Sales Revenue", amount: 320000 },
  { category: "Revenue", item: "Service Revenue", amount: 85000 },
  { category: "Revenue", item: "Interest Income", amount: 2500 },
  { category: "Expenses", item: "Cost of Goods Sold", amount: -192000 },
  { category: "Expenses", item: "Salaries Expense", amount: -78000 },
  { category: "Expenses", item: "Rent Expense", amount: -25000 },
  { category: "Expenses", item: "Utilities Expense", amount: -15000 },
  { category: "Expenses", item: "Office Supplies", amount: -10000 },
  { category: "Expenses", item: "Depreciation", amount: -12500 },
  { category: "Expenses", item: "Marketing Expense", amount: -18000 },
  { category: "Expenses", item: "Insurance", amount: -8500 },
];

export const monthlyProfitData: MonthlyProfitData[] = [
  { month: "Jan", revenue: 280000, expenses: 232000, profit: 48000 },
  { month: "Feb", revenue: 290000, expenses: 235000, profit: 55000 },
  { month: "Mar", revenue: 310000, expenses: 245000, profit: 65000 },
  { month: "Apr", revenue: 320000, expenses: 258000, profit: 62000 },
  { month: "May", revenue: 350000, expenses: 275000, profit: 75000 },
  { month: "Jun", revenue: 380000, expenses: 290000, profit: 90000 },
];
