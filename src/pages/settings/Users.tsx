
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/contexts/SessionContext";
import { UserRole } from "@/types/auth";

const mockUsersRoles = [
  {
    id: "USR001",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Company Admin",
    created_at: "2025-03-11",
    status: "active",
    last_login: "2025-04-21 08:45",
  },
  {
    id: "USR002",
    name: "Sam Smith",
    email: "sam@example.com",
    role: "Staff",
    created_at: "2025-04-03",
    status: "inactive",
    last_login: "2025-04-15 14:22",
  },
  {
    id: "USR003",
    name: "Ngozi Okonkwo",
    email: "ngozi@example.com",
    role: "Branch Manager",
    created_at: "2025-01-22",
    status: "active",
    last_login: "2025-04-21 09:12",
  },
  {
    id: "USR004",
    name: "Ahmed Bello",
    email: "ahmed@example.com",
    role: "Inventory Manager",
    created_at: "2025-02-18",
    status: "active",
    last_login: "2025-04-20 16:05",
  },
  {
    id: "USR005",
    name: "Joy Adebayo",
    email: "joy@example.com",
    role: "Sales Manager",
    created_at: "2025-03-29",
    status: "active",
    last_login: "2025-04-21 07:30",
  },
];

export default function UsersRoles() {
  const { session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter users based on search term
  const filteredUsers = mockUsersRoles.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Only super_admin and company_admin can manage users
  const canManageUsers = session.currentRole === "super_admin" || session.currentRole === "company_admin";

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Users &amp; Roles</h1>
          
          {canManageUsers && (
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          )}
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>Last Login</TableHead>
                {canManageUsers && <TableHead></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Company Admin" ? "default" : "outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "success" : "secondary"} className={
                      user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                      "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>{user.last_login}</TableCell>
                  {canManageUsers && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            {user.status === "active" ? "Deactivate" : "Activate"} User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
