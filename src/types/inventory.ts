
// Inventory Types for Wasper Business Hub
export type Product = {
  id: string;
  company_id: string;
  name: string;
  sku: string;
  category_id: string;
  brand_id: string;
  unit_id: string;
  description?: string;
  image_url?: string;
  cost_price: number;
  selling_price: number;
  created_at: string;
  updated_at: string;
};

export type StockEntry = {
  id: string;
  branch_id: string;
  product_id: string;
  quantity: number;
  type: 'opening' | 'in' | 'out' | 'transfer';
  batch?: string;
  expiry_date?: string;
  created_at: string;
  created_by: string; // user_id
  reference_id?: string; // e.g., sale_id, purchase_id, transfer_id
  notes?: string;
};

export type Category = {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  created_at: string;
};

export type Brand = {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  created_at: string;
};

export type Unit = {
  id: string;
  company_id: string;
  name: string;
  abbreviation: string;
  created_at: string;
};
