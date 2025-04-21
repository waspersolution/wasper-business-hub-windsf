
import { useState } from "react";
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

// Mock users data
const mockUsers = [
  {
    id: "USR001",
    name: "John Smith",
    email: "john@example.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2025-04-20 14:25",
  },
  {
    id: "USR002",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "branch_manager",
    status: "active",
    lastLogin: "2025-04-20 09:31",
  },
  {
    id: "USR003",
    name: "Ibrahim Hassan",
    email: "ibrahim@example.com",
    role: "inventory_manager",
    status: "active",
    lastLogin: "2025-04-20 11:15",
  },
  {
    id: "USR004",
    name: "Chidi Okafor",
    email: "chidi@example.com",
    role: "sales_manager",
    status: "inactive",
    lastLogin: "2025-04-15 16:20",
  },
  {
    id: "USR005",
    name: "Fatima Umar",
    email: "fatima@example.com",
    role: "purchase_manager",
    status: "active",
    lastLogin: "2025-04-20 14:05",
  }
];

export default function UsersRoles() {
  const { session } = useSession();
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  
  // Check if user has permission to manage users
  const canManageUsers = ["super_admin", "company_admin"].includes(session.currentRole);
  
  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {...user, status: user.status === "active" ? "inactive" : "active"} 
        : user
    ));
    
    toast({
      title: "User Status Updated",
      description: "The user's status has been updated successfully.",
    });
  };
  
  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
      variant: "destructive",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Users & Roles</h1>
          
          {canManageUsers && (
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          )}
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    {canManageUsers && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                            {user.status === "active" ? (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Lock className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
