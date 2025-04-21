
import { useState } from "react";
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
  XCircle,
  MapPin
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types/auth";

// Mock staff users data
const mockUsers = [
  {
    id: "USR002",
    name: "Jane Doe",
    email: "jane@example.com",
    branch: "Main Branch",
    role: "branch_manager",
    status: "active",
    lastLogin: "2025-04-20 09:31",
  },
  {
    id: "USR003",
    name: "Ibrahim Hassan",
    email: "ibrahim@example.com",
    branch: "Warehouse",
    role: "inventory_manager",
    status: "active",
    lastLogin: "2025-04-20 11:15",
  },
  {
    id: "USR004",
    name: "Chidi Okafor",
    email: "chidi@example.com",
    branch: "Apapa Branch",
    role: "sales_manager",
    status: "inactive",
    lastLogin: "2025-04-15 16:20",
  },
  {
    id: "USR005",
    name: "Fatima Umar",
    email: "fatima@example.com",
    branch: "Main Branch",
    role: "purchase_manager",
    status: "active",
    lastLogin: "2025-04-20 14:05",
  }
];

// Mock branches data
const mockBranches = [
  { id: "BR001", name: "Main Branch" },
  { id: "BR002", name: "Warehouse" },
  { id: "BR003", name: "Apapa Branch" },
  { id: "BR004", name: "Ikeja Branch" }
];

const roleOptions: { value: UserRole; label: string }[] = [
  { value: "branch_manager", label: "Branch Manager" },
  { value: "inventory_manager", label: "Inventory Manager" },
  { value: "sales_manager", label: "Sales Manager" },
  { value: "staff", label: "Staff" }
];

export function StaffUserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  
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
  
  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const branchId = formData.get('branch') as string;
    const branch = mockBranches.find(b => b.id === branchId);
    const role = formData.get('role') as UserRole;
    
    if (!branch) return;
    
    const newUser = {
      id: `USR${(users.length + 1).toString().padStart(3, '0')}`,
      name: formData.get('userName') as string,
      email: formData.get('userEmail') as string,
      branch: branch.name,
      role,
      status: "active",
      lastLogin: "-",
    };
    
    setUsers([...users, newUser]);
    setIsNewUserDialogOpen(false);
    
    toast({
      title: "User Created",
      description: `${newUser.name} has been created successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Staff Users</h2>
        <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Staff User</DialogTitle>
              <DialogDescription>
                Add a new staff user to your company. 
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="userName">Full Name</Label>
                  <Input id="userName" name="userName" placeholder="John Doe" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input id="userEmail" name="userEmail" type="email" placeholder="user@company.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select name="branch" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBranches.map(branch => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Branch</TableHead>
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
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                    {user.branch}
                  </div>
                </TableCell>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
