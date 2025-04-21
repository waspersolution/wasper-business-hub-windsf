
export type BankAccount = {
  id: string;
  name: string;
  account_number: string;
  bank_name: string;
  account_type: string;
  currency: string;
  balance: number;
  last_reconciled?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  account_id: string;
  date: string;
  description: string;
  reference: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  category?: string;
  reconciled: boolean;
  created_at: string;
};
