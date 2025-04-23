
export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export type Account = {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  subtype: string;
  balance: number;
  active: boolean;
  parent_id?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};
