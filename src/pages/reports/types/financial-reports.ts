
export type TrialBalanceItem = {
  account_code: string;
  account_name: string;
  account_type: string;
  debit: number;
  credit: number;
  balance: number;
};

export type ProfitLossItem = {
  category: string;
  item: string;
  amount: number;
};

export type MonthlyProfitData = {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
};

export type CashFlowItem = {
  category: string;
  item: string;
  amount: number;
  isTotal?: boolean;
  isGrandTotal?: boolean;
  isInfo?: boolean;
};

export type MonthlyData = {
  month: string;
  operating: number;
  investing: number;
  financing: number;
  netCashFlow: number;
};
