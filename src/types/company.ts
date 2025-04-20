
// Company and Branch Types for Wasper Business Hub
export type Company = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  created_at: string;
  created_by: string; // user_id
  subscription_plan?: string;
  subscription_status?: 'active' | 'inactive' | 'trial';
  subscription_expiry?: string;
};

export type Branch = {
  id: string;
  company_id: string;
  name: string;
  address?: string;
  phone?: string;
  manager_id?: string; // user_id of branch manager
  created_at: string;
  is_main_branch: boolean;
};
