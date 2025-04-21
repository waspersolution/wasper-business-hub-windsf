
import { useState, useEffect } from 'react';
import { Branch } from '@/types/company';

// Mock branches for demonstration
const mockBranches: Branch[] = [
  {
    id: "B001",
    company_id: "C001",
    name: "Main Branch",
    address: "123 Main Street, City",
    phone: "+1234567890",
    created_at: "2023-01-01T00:00:00Z",
    is_main_branch: true
  },
  {
    id: "B002",
    company_id: "C001",
    name: "Downtown Branch",
    address: "456 Market Street, Downtown",
    phone: "+0987654321",
    created_at: "2023-02-01T00:00:00Z",
    is_main_branch: false
  },
  {
    id: "B003",
    company_id: "C001",
    name: "Westside Branch",
    address: "789 West Avenue",
    phone: "+1122334455",
    created_at: "2023-03-01T00:00:00Z",
    is_main_branch: false
  }
];

export function useBranchSelection() {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  
  // Initialize with main branch
  useEffect(() => {
    const mainBranch = branches.find(b => b.is_main_branch) || branches[0];
    
    // Check if we have a saved branch selection
    const savedBranchId = localStorage.getItem('selectedBranchId');
    const savedBranch = savedBranchId 
      ? branches.find(b => b.id === savedBranchId) 
      : null;
    
    setCurrentBranch(savedBranch || mainBranch);
  }, []);
  
  // Switch branch function
  const switchBranch = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch) {
      setCurrentBranch(branch);
      localStorage.setItem('selectedBranchId', branchId);
      
      // Here you would typically trigger data reloading for the new branch
      // For now we're just saving the selection
    }
  };
  
  return {
    branches,
    currentBranch,
    switchBranch
  };
}
