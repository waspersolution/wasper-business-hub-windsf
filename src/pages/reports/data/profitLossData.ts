
import type { ProfitLossItem, MonthlyProfitData, TrialBalanceItem } from "../types/financial-reports";

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

export const trialBalanceData: TrialBalanceItem[] = [
  { account_code: "1100", account_name: "Cash", account_type: "Asset", debit: 125000, credit: 0, balance: 125000 },
  { account_code: "1200", account_name: "Accounts Receivable", account_type: "Asset", debit: 75000, credit: 0, balance: 75000 },
  { account_code: "1300", account_name: "Inventory", account_type: "Asset", debit: 250000, credit: 0, balance: 250000 },
  { account_code: "1400", account_name: "Prepaid Expenses", account_type: "Asset", debit: 15000, credit: 0, balance: 15000 },
  { account_code: "1500", account_name: "Equipment", account_type: "Asset", debit: 350000, credit: 0, balance: 350000 },
  { account_code: "1510", account_name: "Accumulated Depreciation", account_type: "Asset", debit: 0, credit: 120000, balance: -120000 },
  { account_code: "2100", account_name: "Accounts Payable", account_type: "Liability", debit: 0, credit: 65000, balance: -65000 },
  { account_code: "2200", account_name: "Salaries Payable", account_type: "Liability", debit: 0, credit: 45000, balance: -45000 },
  { account_code: "2300", account_name: "Unearned Revenue", account_type: "Liability", debit: 0, credit: 30000, balance: -30000 },
  { account_code: "2800", account_name: "Long-term Loan", account_type: "Liability", debit: 0, credit: 200000, balance: -200000 },
  { account_code: "3100", account_name: "Common Stock", account_type: "Equity", debit: 0, credit: 300000, balance: -300000 },
  { account_code: "3200", account_name: "Retained Earnings", account_type: "Equity", debit: 0, credit: 135000, balance: -135000 },
  { account_code: "4100", account_name: "Sales Revenue", account_type: "Income", debit: 0, credit: 420000, balance: -420000 },
  { account_code: "4200", account_name: "Service Revenue", account_type: "Income", debit: 0, credit: 85000, balance: -85000 },
  { account_code: "4300", account_name: "Interest Income", account_type: "Income", debit: 0, credit: 2500, balance: -2500 },
  { account_code: "5100", account_name: "Cost of Goods Sold", account_type: "Expense", debit: 192000, credit: 0, balance: 192000 },
  { account_code: "5200", account_name: "Salaries Expense", account_type: "Expense", debit: 78000, credit: 0, balance: 78000 },
  { account_code: "5300", account_name: "Rent Expense", account_type: "Expense", debit: 25000, credit: 0, balance: 25000 },
  { account_code: "5400", account_name: "Utilities Expense", account_type: "Expense", debit: 15000, credit: 0, balance: 15000 },
  { account_code: "5500", account_name: "Office Supplies", account_type: "Expense", debit: 10000, credit: 0, balance: 10000 },
  { account_code: "5600", account_name: "Depreciation", account_type: "Expense", debit: 12500, credit: 0, balance: 12500 },
  { account_code: "5700", account_name: "Marketing Expense", account_type: "Expense", debit: 18000, credit: 0, balance: 18000 },
  { account_code: "5800", account_name: "Insurance", account_type: "Expense", debit: 8500, credit: 0, balance: 8500 }
];
