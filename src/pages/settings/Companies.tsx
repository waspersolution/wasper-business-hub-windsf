
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Building, CircleX, Check, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Company, Branch } from "@/types/company";

// Mock data enhanced with more details
const mockCompanies: Company[] = [
  {
    id: "COMP001",
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    phone: "+234 800 123 4567",
    address: "123 Main Street, Lagos",
    created_at: "2025-02-11",
    created_by: "USER001",
    logo_url: "/placeholder.svg",
    subscription_plan: "business",
    subscription_status: "active",
  }
];

const mockBranches: Branch[] = [
  {
    id: "BR001",
    company_id: "COMP001",
    name: "Ikeja Branch",
    address: "15 Allen Avenue, Ikeja, Lagos",
    phone: "+234 812 345 6789",
    created_at: "2025-03-01",
    is_main_branch: true,
  },
  {
    id: "BR002",
    company_id: "COMP001",
    name: "Apapa Branch",
    address: "27 Creek Road, Apapa, Lagos",
    phone: "+234 814 987 6543",
    created_at: "2025-03-08",
    is_main_branch: false,
  }
];

// Form schema
const companyFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters."),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
});

const branchFormSchema = z.object({
  name: z.string().min(2, "Branch name must be at least 2 characters."),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(5, "Phone number is required"),
  is_main_branch: z.boolean().default(false),
});

export default function CompaniesBranches() {
  const [activeTab, setActiveTab] = useState("company");
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [openBranchDialog, setOpenBranchDialog] = useState(false);

  // Company form
  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Branch form
  const branchForm = useForm<z.infer<typeof branchFormSchema>>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      is_main_branch: false,
    },
  });

  // Form submission handlers
  const onCompanySubmit = (values: z.infer<typeof companyFormSchema>) => {
    console.log(values);
    setOpenCompanyDialog(false);
    companyForm.reset();
  };

  const onBranchSubmit = (values: z.infer<typeof branchFormSchema>) => {
    console.log(values);
    setOpenBranchDialog(false);
    branchForm.reset();
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies & Branches</h1>
            <p className="text-muted-foreground mt-1">
              Manage your company information and branch locations
            </p>
          </div>
          <div className="flex gap-4">
            <Dialog open={openCompanyDialog} onOpenChange={setOpenCompanyDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={18} /> Add Company
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Company</DialogTitle>
                  <DialogDescription>
                    Enter details to add a new company to the system.
                  </DialogDescription>
                </DialogHeader>
                <Form {...companyForm}>
                  <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
                    <FormField
                      control={companyForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={companyForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="company@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={companyForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={companyForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Save Company</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Dialog open={openBranchDialog} onOpenChange={setOpenBranchDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2" variant="outline">
                  <Plus size={18} /> Add Branch
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Branch</DialogTitle>
                  <DialogDescription>
                    Enter details to add a new branch location.
                  </DialogDescription>
                </DialogHeader>
                <Form {...branchForm}>
                  <form onSubmit={branchForm.handleSubmit(onBranchSubmit)} className="space-y-4">
                    <FormField
                      control={branchForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter branch name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={branchForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={branchForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Save Branch</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="branches">Branches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="space-y-6">
            {mockCompanies.map((company) => (
              <Card key={company.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{company.name}</CardTitle>
                      <CardDescription>ID: {company.id}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        variant={company.subscription_status === 'active' ? 'success' : 'secondary'}
                        className="capitalize"
                      >
                        {company.subscription_status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {company.subscription_plan} Plan
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col border rounded-md p-4 bg-muted/30">
                        <span className="text-sm text-muted-foreground">Email</span>
                        <span className="font-medium">{company.email}</span>
                      </div>
                      <div className="flex flex-col border rounded-md p-4 bg-muted/30">
                        <span className="text-sm text-muted-foreground">Phone</span>
                        <span className="font-medium">{company.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col border rounded-md p-4 bg-muted/30">
                        <span className="text-sm text-muted-foreground">Address</span>
                        <span className="font-medium">{company.address}</span>
                      </div>
                      <div className="flex flex-col border rounded-md p-4 bg-muted/30">
                        <span className="text-sm text-muted-foreground">Created</span>
                        <span className="font-medium">{company.created_at}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-6 border rounded-md">
                      <div className="w-24 h-24 bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden">
                        {company.logo_url ? (
                          <img 
                            src={company.logo_url} 
                            alt={`${company.name} logo`} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Building size={48} className="text-muted-foreground" />
                        )}
                      </div>
                      <Button variant="outline" size="sm">Change Logo</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end bg-muted/30 border-t">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Pencil size={16} /> Edit Company
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="branches" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Branch Locations</CardTitle>
                <CardDescription>
                  All branch offices and locations for your company
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="w-[100px] text-center">Main Branch</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBranches.map((branch) => (
                      <TableRow key={branch.id}>
                        <TableCell className="font-medium">{branch.id}</TableCell>
                        <TableCell>{branch.name}</TableCell>
                        <TableCell>{branch.address}</TableCell>
                        <TableCell>{branch.phone}</TableCell>
                        <TableCell className="text-center">
                          {branch.is_main_branch ? (
                            <Check className="mx-auto text-green-600" size={18} />
                          ) : (
                            <CircleX className="mx-auto text-muted-foreground" size={18} />
                          )}
                        </TableCell>
                        <TableCell>{branch.created_at}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
