
import { useState } from 'react';

export function usePOSUIState() {
  const [isOnline, setIsOnline] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isDraftDialogOpen, setIsDraftDialogOpen] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<any>(null);
  const [selectedCartIndex, setSelectedCartIndex] = useState<number>(-1);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  return {
    isOnline,
    setIsOnline,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isReceiptOpen,
    setIsReceiptOpen,
    isDraftDialogOpen,
    setIsDraftDialogOpen,
    currentQuantity,
    setCurrentQuantity,
    selectedProductForEdit,
    setSelectedProductForEdit,
    selectedCartIndex,
    setSelectedCartIndex,
    isAddingPayment,
    setIsAddingPayment,
    isMobileCartOpen,
    setIsMobileCartOpen
  };
}
