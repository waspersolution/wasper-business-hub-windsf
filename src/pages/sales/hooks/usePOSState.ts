
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Customer, CustomerGroup } from '@/types/sales';

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
