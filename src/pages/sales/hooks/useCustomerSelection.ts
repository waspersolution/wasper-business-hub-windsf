
import { useState } from 'react';
import { Customer, CustomerGroup } from '@/types/sales';
import { useToast } from '@/hooks/use-toast';

/**
 * @api {get} /api/customers Get Customers
 * @apiDescription Fetch customer list with optional search filter
 * 
 * @apiQuery {string} [search] - Optional search term
 * 
 * @apiSuccess {Object} response Customer list response
 * @apiSuccess {Array} response.customers List of customers
 * @apiSuccess {string} response.customers[].id Customer ID
 * @apiSuccess {string} response.customers[].name Customer name
 * @apiSuccess {string} response.customers[].email Customer email
 * @apiSuccess {string} [response.customers[].phone] Optional phone number
 * @apiSuccess {string} [response.customers[].groupId] Optional customer group ID
 * 
 * @api {get} /api/customer-groups Get Customer Groups
 * @apiDescription Fetch list of customer groups
 * 
 * @apiSuccess {Object} response Customer groups response
 * @apiSuccess {Array} response.groups List of customer groups
 * @apiSuccess {string} response.groups[].id Group ID
 * @apiSuccess {string} response.groups[].name Group name
 * @apiSuccess {number} response.groups[].discount Default discount percentage
 */
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
