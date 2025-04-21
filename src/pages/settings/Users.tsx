
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical, 
  UserPlus, 
  Edit, 
  Trash, 
  Lock, 
  Shield, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/contexts/SessionContext";
import { useToast } from "@/components/ui/use-toast";
import { CompanyUserManagement } from "@/components/UserManagement/CompanyUserManagement";
import { StaffUserManagement } from "@/components/UserManagement/StaffUserManagement";

export default function UsersRoles() {
  const { session } = useSession();
  const { toast } = useToast();
  
  // Determine which view to show based on user role
  const isSuperAdmin = session.currentRole === "super_admin";
  const isCompanyAdmin = session.currentRole === "company_admin";
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {isSuperAdmin ? "Company & User Management" : "User Management"}
          </h1>
        </div>
        
        {isSuperAdmin && <CompanyUserManagement />}
        {isCompanyAdmin && <StaffUserManagement />}
        {!isSuperAdmin && !isCompanyAdmin && (
          <div className="border rounded-md p-8 text-center">
            <p className="text-muted-foreground">
              You don't have permission to manage users.
              Please contact your administrator for access.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
