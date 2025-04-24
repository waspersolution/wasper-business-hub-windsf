
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * @api {post} /api/sales Create Sale
 * @apiDescription Create a new sale record
 * 
 * @apiBody {Object} sale Sale information
 * @apiBody {string} [sale.customerId] Optional customer ID
 * @apiBody {Array} sale.items List of sale items
 * @apiBody {number} sale.items[].productId Product ID
 * @apiBody {number} sale.items[].quantity Quantity sold
 * @apiBody {number} sale.items[].price Unit price in cents
 * @apiBody {number} [sale.items[].discount] Optional item discount
 * @apiBody {string} sale.paymentMethod Payment method used
 * @apiBody {number} sale.total Total amount in cents
 * 
 * @apiSuccess {Object} response Sale creation response
 * @apiSuccess {string} response.saleId Created sale ID
 * @apiSuccess {string} response.receiptNumber Generated receipt number
 */
export function useCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { toast } = useToast();

  const addToCart = (product: any, quantity: number = 1) => {
    if (product) {
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item.id === product.id 
            ? { ...item, qty: item.qty + quantity } 
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...product, qty: quantity }]);
      }
      
      toast({
        title: "Item added to cart",
        description: `${product.name} added to cart`,
        duration: 2000,
      });
    }
  };

  const updateQuantity = (id: number, qty: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, qty } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from cart",
      duration: 2000,
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  };
}
