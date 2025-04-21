
// Sales/POS Types for Wasper Business Hub
export type Sale = {
  id: string;
  branch_id: string;
  customer_id?: string;
  total: number;
  payment_method: 'cash' | 'card' | 'transfer' | 'credit';
  status: 'pending' | 'synced' | 'completed' | 'cancelled' | 'draft';
  created_at: string;
  created_by: string; // user_id
  sync_status?: 'pending' | 'synced' | 'failed';
  sync_error?: string;
  notes?: string;
};

export type SaleLine = {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount?: number;
  total: number;
};

export type Customer = {
  id: string;
  company_id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
  customer_group_id?: string;
  branch_id?: string;
};

export type PaymentTransaction = {
  id: string;
  sale_id: string;
  amount: number;
  payment_method: 'cash' | 'card' | 'transfer' | 'credit';
  reference?: string; // e.g., transaction reference from payment gateway
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  created_by: string; // user_id
};

// New types for customer groups and draft sales
export type CustomerGroup = {
  id: string;
  company_id: string;
  branch_id?: string; // Optional: if null, applies to all branches
  name: string;
  discount_rate: number;
  min_order_value: number;
  created_at: string;
  status: 'Active' | 'Inactive';
  description?: string;
};

export type DraftSale = {
  id: string;
  branch_id: string;
  customer_id?: string;
  customer_name?: string;
  items: SaleLine[];
  total: number;
  created_at: string;
  created_by: string;
  created_by_name: string;
  notes?: string;
};

