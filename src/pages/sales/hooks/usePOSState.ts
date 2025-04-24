
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Customer, CustomerGroup } from '@/types/sales';

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

export function usePOSState() {
  const [isOnline, setIsOnline] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isDraftDialogOpen, setIsDraftDialogOpen] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<any>(null);
  const [selectedCartIndex, setSelectedCartIndex] = useState<number>(-1);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    isOnline,
    viewMode,
    searchQuery,
    selectedCategory,
    isReceiptOpen,
    selectedCustomer,
    selectedGroup,
    cartItems,
    isDraftDialogOpen,
    currentQuantity,
    selectedProductForEdit,
    selectedCartIndex,
    isAddingPayment,
    isMobileCartOpen,
    filteredProducts,
    setIsOnline,
    setViewMode,
    setSearchQuery,
    setSelectedCategory,
    setIsReceiptOpen,
    setSelectedCustomer,
    setSelectedGroup,
    setCartItems,
    setIsDraftDialogOpen,
    setCurrentQuantity,
    setSelectedProductForEdit,
    setSelectedCartIndex,
    setIsAddingPayment,
    setIsMobileCartOpen,
    toast
  };
}
