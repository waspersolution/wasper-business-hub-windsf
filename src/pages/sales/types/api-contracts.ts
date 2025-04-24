
/**
 * API Contracts for POS System
 * These types document the expected shapes of API requests and responses
 */

import { Sale, SaleLine, Customer, CustomerGroup } from "@/types/sales";

// GET /api/products - Fetch available products
export interface ProductsResponse {
  products: {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    barcode?: string;
    status: 'active' | 'inactive';
  }[];
}

// GET /api/customers - Fetch customer list
export interface CustomersResponse {
  customers: Customer[];
}

// GET /api/customer-groups - Fetch customer groups
export interface CustomerGroupsResponse {
  groups: CustomerGroup[];
}

// POST /api/sales - Create new sale
export interface CreateSaleRequest {
  customer_id?: string;
  branch_id: string;
  items: {
    product_id: string;
    quantity: number;
    unit_price: number;
    discount?: number;
  }[];
  payment_method: 'cash' | 'card' | 'transfer' | 'credit';
  total: number;
  notes?: string;
}

// POST /api/sales/draft - Save draft sale
export interface SaveDraftRequest {
  customer_id?: string;
  branch_id: string;
  items: SaleLine[];
  notes?: string;
}

// GET /api/sales/drafts - Fetch draft sales
export interface DraftSalesResponse {
  drafts: Sale[];
}
