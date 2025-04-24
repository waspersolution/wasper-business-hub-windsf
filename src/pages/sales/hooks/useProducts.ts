
import { useQuery } from "@tanstack/react-query";

/**
 * @api {get} /api/products Get Products
 * @apiDescription Fetch products with optional category and search filters
 * 
 * @apiQuery {string} [category] - Optional category filter
 * @apiQuery {string} [search] - Optional search term
 * 
 * @apiSuccess {Object} response Product list response
 * @apiSuccess {Array} response.products List of products
 * @apiSuccess {number} response.products[].id Product ID
 * @apiSuccess {string} response.products[].name Product name
 * @apiSuccess {number} response.products[].price Product price in cents
 * @apiSuccess {string} response.products[].category Product category
 * @apiSuccess {number} response.products[].stock Current stock level
 * @apiSuccess {string} [response.products[].barcode] Optional barcode
 * @apiSuccess {string} response.products[].status Product status ('active'|'inactive')
 */
export function useProducts(category?: string, search?: string) {
  return useQuery({
    queryKey: ['products', category, search],
    queryFn: () => ({ products: mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search?.toLowerCase() ?? '');
      const matchesCategory = category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    })})
  });
}

// Mock data - in real app this would come from API
const mockProducts = [
  { id: 1, name: "Coca-Cola 50cl", price: 200, category: "beverages", stock: 24 },
  { id: 2, name: "Bread Sliced 600g", price: 950, category: "food", stock: 15 },
  { id: 3, name: "iPhone Charger", price: 3500, category: "electronics", stock: 8 },
  { id: 4, name: "T-Shirt Plain", price: 2500, category: "clothing", stock: 30 },
  { id: 5, name: "Hand Soap", price: 800, category: "personal", stock: 12 }
];
