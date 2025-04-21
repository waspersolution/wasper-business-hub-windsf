
import { useState } from "react";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Briefcase, 
  MapPin, 
  Archive, 
  TrendingUp,
  Users,
  UserPlus,
  PencilLine,
  Trash2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/contexts/SessionContext";
import { toast } from "sonner";

// Mock users data
const MOCK_USERS = [
  {
    id: "u1",
    email: "super@wasper.com",
    full_name: "Super Admin",
    created_at: "2023-10-01",
    last_sign_in: "2023-04-20",
    role: "super_admin" as UserRole,
  },
  {
    id: "u2",
    email: "admin@wasper.com",
    full_name: "Company Admin",
    created_at: "2023-10-05",
    last_sign_in: "2023-04-19",
    role: "company_admin" as UserRole,
  },
  {
    id: "u3",
    email: "branch@wasper.com",
    full_name: "Branch Manager",
    created_at: "2023-11-15",
    last_sign_in: "2023-04-18",
    role: "branch_manager" as UserRole,
  },
  {
    id: "u4",
    email: "inventory@wasper.com",
    full_name: "Inventory Manager",
    created_at: "2024-01-10", 
    last_sign_in: "2023-04-15",
    role: "inventory_manager" as UserRole,
  },
  {
    id: "u5",
    email: "sales@wasper.com",
    full_name: "Sales Manager",
    created_at: "2024-02-20",
    last_sign_in: "2023-04-10",
    role: "sales_manager" as UserRole,
  }
];

// Role badge mapping
const ROLE_BADGES: Record<UserRole, { label: string; variant: "default" | "outline" | "secondary" | "destructive"; icon: React.ReactNode }> = {
  "super_admin": { 
    label: "Super Admin", 
    variant: "destructive", 
    icon: <Shield className="h-3 w-3 mr-1" /> 
  },
  "company_admin": { 
    label: "Company Admin", 
    variant: "default", 
    icon: <Briefcase className="h-3 w-3 mr-1" /> 
  },
  "branch_manager": { 
    label: "Branch Manager", 
    variant: "secondary", 
    icon: <MapPin className="h-3 w-3 mr-1" /> 
  },
  "inventory_manager": { 
    label: "Inventory Manager", 
    variant: "outline", 
    icon: <Archive className="h-3 w-3 mr-1" /> 
  },
  "sales_manager": { 
    label: "Sales Manager", 
    variant: "outline", 
    icon: <TrendingUp className="h-3 w-3 mr-1" /> 
  },
  "staff": { 
    label: "Staff", 
    variant: "outline", 
    icon: <Users className="h-3 w-3 mr-1" /> 
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function UsersRoles() {
  const { session } = useSession();
  const [users] = useState(MOCK_USERS);
  
  // Check if current user has permission to manage users
  const canManageUsers = ['super_admin', 'company_admin'].includes(session.currentRole);

  const handleEdit = (userId: string) => {
    toast.info(`Editing user ${userId}`, {
      description: "This would open a modal to edit user details"
    });
  };

  const handleDelete = (userId: string, userName: string) => {
    toast.success(`User ${userName} deleted`, {
      description: "This is a mock action - no actual deletion occurred"
    });
  };

  const handleAddUser = () => {
    toast.info("Adding new user", {
      description: "This would open a modal to add a new user"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Users &amp; Roles Management</h1>
          <p className="text-muted-foreground">Manage system users and their role assignments</p>
        </div>
        
        {canManageUsers && (
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        )}
      </div>
      
      <Table>
        <TableCaption>List of system users and their roles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Active</TableHead>
            {canManageUsers && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const roleBadge = ROLE_BADGES[user.role];
            
            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={roleBadge.variant} className="flex w-fit items-center">
                    {roleBadge.icon}
                    {roleBadge.label}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell>{user.last_sign_in ? formatDate(user.last_sign_in) : "Never"}</TableCell>
                {canManageUsers && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id)}>
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(user.id, user.full_name)}
                        disabled={user.role === "super_admin"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <div className="rounded-md bg-muted p-4 mt-4">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          <p>Note: This is a mock implementation. In a real app, user management would connect to your authentication provider.</p>
        </div>
      </div>
    </div>
  );
}
