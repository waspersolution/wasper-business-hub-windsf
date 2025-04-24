
import { useState } from 'react';
import { Customer, CustomerGroup } from '@/types/sales';
import { useToast } from '@/hooks/use-toast';

export function useCustomerSelection() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    toast({
      title: "Customer selected",
      description: `${customer.name} selected`,
      duration: 2000,
    });
  };

  const handleCustomerGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  return {
    selectedCustomer,
    selectedGroup,
    handleCustomerSelect,
    handleCustomerGroupSelect
  };
}
