
import { BalanceSheetData, MonthlyBalanceData } from "../types/balance-sheet";

export const balanceSheetData: BalanceSheetData = {
  assets: [
    { category: "Current Assets", item: "Cash", amount: 190000 },
    { category: "Current Assets", item: "Accounts Receivable", amount: 87500 },
    { category: "Current Assets", item: "Inventory", amount: 145000 },
    { category: "Current Assets", item: "Prepaid Expenses", amount: 12500 },
    { category: "Current Assets", item: "Other Current Assets", amount: 8500 },
    { category: "Fixed Assets", item: "Property & Equipment", amount: 325000 },
    { category: "Fixed Assets", item: "Less: Accumulated Depreciation", amount: -75000 },
    { category: "Fixed Assets", item: "Intangible Assets", amount: 120000 },
    { category: "Other Assets", item: "Long-term Investments", amount: 200000 },
    { category: "Other Assets", item: "Other Non-current Assets", amount: 15000 },
  ],
  liabilities: [
    { category: "Current Liabilities", item: "Accounts Payable", amount: 45000 },
    { category: "Current Liabilities", item: "Short-term Loans", amount: 75000 },
    { category: "Current Liabilities", item: "Current Portion of Long-term Debt", amount: 25000 },
    { category: "Current Liabilities", item: "Accrued Expenses", amount: 18500 },
    { category: "Current Liabilities", item: "Taxes Payable", amount: 32500 },
    { category: "Current Liabilities", item: "Deferred Revenue", amount: 22000 },
    { category: "Long-term Liabilities", item: "Long-term Debt", amount: 280000 },
    { category: "Long-term Liabilities", item: "Deferred Tax Liabilities", amount: 35000 },
    { category: "Long-term Liabilities", item: "Other Long-term Liabilities", amount: 17500 },
  ],
  equity: [
    { category: "Equity", item: "Common Stock", amount: 100000 },
    { category: "Equity", item: "Additional Paid-in Capital", amount: 150000 },
    { category: "Equity", item: "Retained Earnings", amount: 182000 },
    { category: "Equity", item: "Other Comprehensive Income", amount: 8500 },
  ]
};

export const monthlyBalanceData: MonthlyBalanceData[] = [
  { month: "Jan", assets: 750000, liabilities: 510000, equity: 240000 },
  { month: "Feb", assets: 765000, liabilities: 520000, equity: 245000 },
  { month: "Mar", assets: 780000, liabilities: 525000, equity: 255000 },
  { month: "Apr", assets: 795000, liabilities: 530000, equity: 265000 },
  { month: "May", assets: 810000, liabilities: 535000, equity: 275000 },
  { month: "Jun", assets: 830000, liabilities: 540000, equity: 290000 },
];
