
import { useState, useEffect } from "react";
import { CustomerGroup, Customer } from "@/types/sales";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data for customer groups
const mockCustomerGroups: CustomerGroup[] = [
  {
    id: "G001",
    company_id: "C001",
    branch_id: "B001", // Main branch
    name: "Wholesale Buyers",
    discount_rate: 10,
    min_order_value: 50000,
    created_at: "2025-01-15",
    status: "Active",
    description: "B2B customers with high-volume purchases",
  },
  {
    id: "G002",
    company_id: "C001",
    branch_id: undefined, // All branches
    name: "Retail Customers",
    discount_rate: 0,
    min_order_value: 0,
    created_at: "2025-01-15",
    status: "Active",
    description: "Regular retail customers with no special pricing",
  },
  {
    id: "G003",
    company_id: "C001",
    branch_id: "B002", // Secondary branch
    name: "VIP Customers",
    discount_rate: 15,
    min_order_value: 25000,
    created_at: "2025-02-05",
    status: "Active",
    description: "Premium customers with special privileges and pricing",
  },
];

// Mock customers
const mockCustomers: Customer[] = [
  { id: "C1", company_id: "C001", name: "John Doe", customer_group_id: "G001", branch_id: "B001", created_at: "", updated_at: "" },
  { id: "C2", company_id: "C001", name: "Jane Smith", customer_group_id: "G001", branch_id: "B001", created_at: "", updated_at: "" },
  { id: "C3", company_id: "C001", name: "Alice Johnson", customer_group_id: "G002", branch_id: undefined, created_at: "", updated_at: "" },
  { id: "C4", company_id: "C001", name: "Bob Williams", customer_group_id: "G003", branch_id: "B002", created_at: "", updated_at: "" },
];

interface CustomerGroupSelectorProps {
  currentBranchId: string;
  onCustomerGroupSelect: (groupId: string) => void;
  onCustomerSelect: (customer: Customer) => void;
}

export default function CustomerGroupSelector({
  currentBranchId,
  onCustomerGroupSelect,
  onCustomerSelect,
}: CustomerGroupSelectorProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [availableGroups, setAvailableGroups] = useState<CustomerGroup[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  
  // Filter customer groups based on branch
  useEffect(() => {
    // Get groups that are either linked to current branch or available to all branches
    const groups = mockCustomerGroups.filter(
      group => group.status === "Active" && (!group.branch_id || group.branch_id === currentBranchId)
    );
    setAvailableGroups(groups);
  }, [currentBranchId]);
  
  // Handle group selection
  const handleGroupChange = (groupId: string) => {
    setSelectedGroupId(groupId);
    onCustomerGroupSelect(groupId);
    
    // Filter customers based on selected group
    const customers = mockCustomers.filter(
      customer => customer.customer_group_id === groupId && 
      (!customer.branch_id || customer.branch_id === currentBranchId)
    );
    setFilteredCustomers(customers);
  };
  
  // Handle customer selection
  const handleCustomerChange = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (customer) {
      onCustomerSelect(customer);
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="customer-group">Customer Group</Label>
        <Select value={selectedGroupId} onValueChange={handleGroupChange}>
          <SelectTrigger id="customer-group" className="w-full">
            <SelectValue placeholder="Select customer group" />
          </SelectTrigger>
          <SelectContent>
            {availableGroups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name} {group.discount_rate > 0 && `(${group.discount_rate}% discount)`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedGroupId && filteredCustomers.length > 0 && (
        <div>
          <Label htmlFor="customer">Customer</Label>
          <Select onValueChange={handleCustomerChange}>
            <SelectTrigger id="customer" className="w-full">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {filteredCustomers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
