
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
  Building
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
import { Company } from "@/types/company";

// Mock companies data
const mockCompanies = [
  {
    id: "COM001",
    name: "FoodLink Nigeria Ltd",
    email: "admin@foodlink.com",
    subscription_status: "active",
    created_at: "2025-03-10",
  },
  {
    id: "COM002",
    name: "PharmaCare Plus",
    email: "admin@pharmacare.com",
    subscription_status: "active",
    created_at: "2025-03-15",
  },
  {
    id: "COM003", 
    name: "Warehouse Solutions",
    email: "admin@warehouse.com",
    subscription_status: "trial",
    created_at: "2025-04-01",
  }
];

// Mock company admin users
const mockCompanyUsers = [
  {
    id: "USR001",
    name: "John Smith",
    email: "john@foodlink.com",
    company_id: "COM001",
    company_name: "FoodLink Nigeria Ltd",
    role: "company_admin",
    status: "active",
    lastLogin: "2025-04-20 14:25",
  },
  {
    id: "USR002",
    name: "Jane Doe",
    email: "jane@pharmacare.com",
    company_id: "COM002",
    company_name: "PharmaCare Plus",
    role: "company_admin",
    status: "active",
    lastLogin: "2025-04-20 09:31",
  },
  {
    id: "USR003",
    name: "Ibrahim Hassan",
    email: "ibrahim@warehouse.com",
    company_id: "COM003",
    company_name: "Warehouse Solutions",
    role: "company_admin",
    status: "pending",
    lastLogin: "-",
  }
];

export function CompanyUserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockCompanyUsers);
  const [companies, setCompanies] = useState(mockCompanies);
  const [isNewCompanyDialogOpen, setIsNewCompanyDialogOpen] = useState(false);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {...user, status: user.status === "active" ? "inactive" : "active"} 
        : user
    ));
    
    toast({
      title: "User Status Updated",
      description: "The company admin's status has been updated successfully.",
    });
  };
  
  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User Deleted",
      description: "The company admin has been deleted successfully.",
      variant: "destructive",
    });
  };
  
  const handleAddCompany = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCompany = {
      id: `COM${(companies.length + 1).toString().padStart(3, '0')}`,
      name: formData.get('companyName') as string,
      email: formData.get('companyEmail') as string,
      subscription_status: "trial",
      created_at: new Date().toISOString().split('T')[0],
    };
    
    setCompanies([...companies, newCompany]);
    setIsNewCompanyDialogOpen(false);
    
    toast({
      title: "Company Created",
      description: `${newCompany.name} has been created successfully.`,
    });
  };
  
  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const companyId = formData.get('companyId') as string;
    const company = companies.find(c => c.id === companyId);
    
    if (!company) return;
    
    const newUser = {
      id: `USR${(users.length + 1).toString().padStart(3, '0')}`,
      name: formData.get('userName') as string,
      email: formData.get('userEmail') as string,
      company_id: companyId,
      company_name: company.name,
      role: "company_admin",
      status: "pending",
      lastLogin: "-",
    };
    
    setUsers([...users, newUser]);
    setIsNewUserDialogOpen(false);
    
    toast({
      title: "Company Admin Created",
      description: `${newUser.name} has been created successfully as an admin for ${company.name}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Companies Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Companies</h2>
          <Dialog open={isNewCompanyDialogOpen} onOpenChange={setIsNewCompanyDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Building className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Company</DialogTitle>
                <DialogDescription>
                  Add a new company to the system.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCompany}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" placeholder="Enter company name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="companyEmail">Primary Email</Label>
                    <Input id="companyEmail" name="companyEmail" type="email" placeholder="company@example.com" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Company</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-mono text-xs">{company.id}</TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        company.subscription_status === "active" 
                          ? "bg-green-100 text-green-800" 
                          : company.subscription_status === "trial"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {company.subscription_status}
                    </Badge>
                  </TableCell>
                  <TableCell>{company.created_at}</TableCell>
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
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Manage Subscription
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
      
      {/* Company Admins Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Company Administrators</h2>
          <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Company Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Company Administrator</DialogTitle>
                <DialogDescription>
                  Add a new administrator account for a company.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyId">Select Company</Label>
                    <Select name="companyId" required defaultValue={selectedCompany || undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map(company => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" name="userName" placeholder="John Doe" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input id="userEmail" name="userEmail" type="email" placeholder="admin@company.com" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Administrator</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company_name}</TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : user.status === "pending" ? (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pending
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
    </div>
  );
}
