
import { useQuery, useMutation } from "@tanstack/react-query";
import type { 
  ProductsResponse, 
  CustomersResponse, 
  CustomerGroupsResponse,
  CreateSaleRequest,
  SaveDraftRequest,
  DraftSalesResponse 
} from "../types/api-contracts";

/**
 * Hook to fetch available products for POS
 * 
 * @endpoint GET /api/products
 * @query category - Optional category filter
 * @query search - Optional search term
 * @returns ProductsResponse
 */
export function useProducts(category?: string, search?: string) {
  return useQuery({
    queryKey: ["products", category, search],
    queryFn: () => {
      // For now using mock data, replace with actual API call
      return Promise.resolve({ products: mockProducts });
    }
  });
}

/**
 * Hook to fetch customers for selection
 * 
 * @endpoint GET /api/customers
 * @query search - Optional search term
 * @returns CustomersResponse
 */
export function useCustomers(search?: string) {
  return useQuery({
    queryKey: ["customers", search],
    queryFn: () => {
      // TODO: Replace with actual API call
      return Promise.resolve({ customers: [] });
    }
  });
}

/**
 * Hook to fetch customer groups
 * 
 * @endpoint GET /api/customer-groups
 * @returns CustomerGroupsResponse
 */
export function useCustomerGroups() {
  return useQuery({
    queryKey: ["customer-groups"],
    queryFn: () => {
      // TODO: Replace with actual API call
      return Promise.resolve({ groups: [] });
    }
  });
}

/**
 * Hook to handle sale creation
 * 
 * @endpoint POST /api/sales
 * @body CreateSaleRequest
 */
export function useCreateSale() {
  return useMutation({
    mutationFn: (data: CreateSaleRequest) => {
      // TODO: Replace with actual API call
      return Promise.resolve({ success: true });
    }
  });
}

/**
 * Hook to save draft sales
 * 
 * @endpoint POST /api/sales/draft
 * @body SaveDraftRequest
 */
export function useSaveDraft() {
  return useMutation({
    mutationFn: (data: SaveDraftRequest) => {
      // TODO: Replace with actual API call
      return Promise.resolve({ success: true });
    }
  });
}

/**
 * Hook to fetch draft sales
 * 
 * @endpoint GET /api/sales/drafts
 * @returns DraftSalesResponse
 */
export function useDraftSales() {
  return useQuery({
    queryKey: ["draft-sales"],
    queryFn: () => {
      // TODO: Replace with actual API call
      return Promise.resolve({ drafts: [] });
    }
  });
}

// Temporary mock data for development
const mockProducts = [
  { id: 1, name: "Coca-Cola 50cl", price: 200, category: "beverages", stock: 24 },
  { id: 2, name: "Bread Sliced 600g", price: 950, category: "food", stock: 15 },
  { id: 3, name: "iPhone Charger", price: 3500, category: "electronics", stock: 8 },
  { id: 4, name: "T-Shirt Plain", price: 2500, category: "clothing", stock: 30 },
  { id: 5, name: "Hand Soap", price: 800, category: "personal", stock: 12 },
  { id: 6, name: "Pepsi 50cl", price: 200, category: "beverages", stock: 20 },
  { id: 7, name: "Rice 1kg", price: 1800, category: "food", stock: 25 },
  { id: 8, name: "USB Cable", price: 1500, category: "electronics", stock: 14 },
  { id: 9, name: "Water 50cl", price: 150, category: "beverages", stock: 48 },
];
