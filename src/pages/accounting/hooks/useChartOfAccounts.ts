
import { useState } from "react";
import { Account } from "@/types/accounting";

export const useChartOfAccounts = (mockAccounts: Account[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [editAccountDialog, setEditAccountDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  
  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || account.type === typeFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && account.active) || 
      (statusFilter === "inactive" && !account.active);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setEditAccountDialog(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    newAccountDialog,
    setNewAccountDialog,
    editAccountDialog,
    setEditAccountDialog,
    selectedAccount,
    filteredAccounts,
    handleEditAccount
  };
};
