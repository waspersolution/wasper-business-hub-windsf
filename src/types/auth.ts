
// Auth Types for Wasper Business Hub
export type User = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  last_sign_in?: string;
};

export type UserRole = 
  | 'super_admin' 
  | 'company_admin' 
  | 'branch_manager' 
  | 'inventory_manager' 
  | 'sales_manager' 
  | 'staff'
  | 'accountant'
  | 'finance_manager';

export type UserRoleAssignment = {
  id: string;
  user_id: string;
  company_id: string;
  branch_id: string | null; // null = company-level
  role: UserRole;
  created_at: string;
  updated_at: string;
};

// Session Context (runtime)
export type SessionContext = {
  userId: string;
  currentCompanyId: string;
  currentBranchId: string;
  currentRole: UserRole;
  isAuthenticated: boolean;
};
