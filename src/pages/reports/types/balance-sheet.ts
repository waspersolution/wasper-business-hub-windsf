
export type BalanceSheetItem = {
  category: string;
  item: string;
  amount: number;
};

export type MonthlyBalanceData = {
  month: string;
  assets: number;
  liabilities: number;
  equity: number;
};

export type BalanceSheetData = {
  assets: BalanceSheetItem[];
  liabilities: BalanceSheetItem[];
  equity: BalanceSheetItem[];
};
