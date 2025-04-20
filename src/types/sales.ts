
// Sales/POS Types for Wasper Business Hub
export type Sale = {
  id: string;
  branch_id: string;
  customer_id?: string;
  total: number;
  payment_method: 'cash' | 'card' | 'transfer' | 'credit';
  status: 'pending' | 'synced' | 'completed' | 'cancelled';
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
