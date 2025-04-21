
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Search, UserRole } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// Mock data for permission roles
const roles = [
  { id: "admin", name: "Administrator", count: 2, color: "blue" },
  { id: "manager", name: "Branch Manager", count: 5, color: "green" },
  { id: "inventory", name: "Inventory Manager", count: 3, color: "amber" },
  { id: "sales", name: "Sales Staff", count: 8, color: "indigo" },
  { id: "accountant", name: "Accountant", count: 2, color: "purple" },
];

// Interface for permissions
interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionGroup {
  id: string;
  name: string;
  permissions: Permission[];
}

// Mock permission data
const permissionGroups: PermissionGroup[] = [
  {
    id: "inventory",
    name: "Inventory Management",
    permissions: [
      { id: "inventory.view", name: "View Inventory", description: "Can view products and stock levels" },
      { id: "inventory.add", name: "Add Products", description: "Can add new products to inventory" },
      { id: "inventory.edit", name: "Edit Products", description: "Can modify existing product details" },
      { id: "inventory.delete", name: "Delete Products", description: "Can remove products from inventory" },
      { id: "inventory.transfer", name: "Stock Transfer", description: "Can transfer stock between locations" },
      { id: "inventory.adjust", name: "Adjust Stock", description: "Can make manual stock adjustments" },
    ],
  },
  {
    id: "sales",
    name: "Sales & Customers",
    permissions: [
      { id: "sales.create", name: "Create Sales", description: "Can create new sales transactions" },
      { id: "sales.view", name: "View Sales", description: "Can view sales history and details" },
      { id: "sales.edit", name: "Edit Sales", description: "Can modify existing sales records" },
      { id: "sales.void", name: "Void Sales", description: "Can cancel or void sales transactions" },
      { id: "sales.discount", name: "Apply Discounts", description: "Can apply discounts to sales" },
      { id: "customers.view", name: "View Customers", description: "Can view customer information" },
      { id: "customers.add", name: "Add Customers", description: "Can add new customers" },
      { id: "customers.edit", name: "Edit Customers", description: "Can edit customer data" },
    ],
  },
  {
    id: "finance",
    name: "Financial & Accounting",
    permissions: [
      { id: "finance.reports", name: "Financial Reports", description: "Can view financial reports" },
      { id: "finance.transactions", name: "View Transactions", description: "Can view financial transactions" },
      { id: "finance.create", name: "Create Entries", description: "Can create journal entries" },
      { id: "finance.approve", name: "Approve Entries", description: "Can approve financial transactions" },
      { id: "finance.settings", name: "Financial Settings", description: "Can modify financial settings" },
    ],
  },
  {
    id: "reports",
    name: "Reports & Analytics",
    permissions: [
      { id: "reports.sales", name: "Sales Reports", description: "Can view sales reports" },
      { id: "reports.inventory", name: "Inventory Reports", description: "Can view inventory reports" },
      { id: "reports.customers", name: "Customer Reports", description: "Can view customer analytics" },
      { id: "reports.financial", name: "Financial Reports", description: "Can view financial reports" },
      { id: "reports.export", name: "Export Reports", description: "Can export reports to files" },
    ],
  },
  {
    id: "settings",
    name: "System Settings",
    permissions: [
      { id: "settings.view", name: "View Settings", description: "Can view system settings" },
      { id: "settings.modify", name: "Modify Settings", description: "Can modify system settings" },
      { id: "settings.users", name: "Manage Users", description: "Can add/edit users" },
      { id: "settings.roles", name: "Manage Roles", description: "Can define roles and permissions" },
      { id: "settings.branches", name: "Manage Branches", description: "Can configure branch settings" },
    ],
  },
];

// Permission management component
export default function Permissions() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [searchQuery, setSearchQuery] = useState("");
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    "inventory.view": true,
    "inventory.add": true,
    "inventory.edit": true,
    "inventory.delete": false,
    "inventory.transfer": true,
    "inventory.adjust": true,
    "sales.create": true,
    "sales.view": true,
    "sales.edit": false,
    "sales.void": false,
    "sales.discount": false,
    "customers.view": true,
    "customers.add": true,
    "customers.edit": true,
    "finance.reports": false,
    "finance.transactions": true,
    "finance.create": false,
    "finance.approve": false,
    "finance.settings": false,
    "reports.sales": true,
    "reports.inventory": true,
    "reports.customers": true,
    "reports.financial": false,
    "reports.export": false,
    "settings.view": true,
    "settings.modify": false,
    "settings.users": false,
    "settings.roles": false,
    "settings.branches": false,
  });

  // Filter permissions based on search query
  const filteredPermissionGroups = permissionGroups
    .map(group => ({
      ...group,
      permissions: group.permissions.filter(
        permission => 
          permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          permission.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(group => group.permissions.length > 0);

  // Handle permission toggle
  const togglePermission = (permissionId: string) => {
    setPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId]
    }));
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Permissions Management</h1>
            <p className="text-muted-foreground mt-1">
              Configure role-based access and permissions
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <UserRole size={16} /> Create New Role
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Role selection sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>Select a role to configure permissions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                      selectedRole === role.id ? "bg-muted/80" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-3 h-3 rounded-full bg-${role.color}-500`}
                        aria-hidden="true"
                      ></div>
                      <span className="font-medium">{role.name}</span>
                    </div>
                    <Badge variant="outline">{role.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permissions configuration */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-4">
              <CardTitle>
                {roles.find(r => r.id === selectedRole)?.name} Permissions
              </CardTitle>
              <CardDescription>
                Configure what users with this role can access and modify
              </CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search permissions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="p-6 pt-2">
                  <Accordion type="multiple" defaultValue={["inventory", "sales"]}>
                    {filteredPermissionGroups.map((group) => (
                      <AccordionItem key={group.id} value={group.id}>
                        <AccordionTrigger className="hover:no-underline hover:bg-muted/50 px-4 rounded-md">
                          <span className="font-medium">{group.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {group.permissions.length}
                          </Badge>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 px-1 py-2">
                            {group.permissions.map((permission) => (
                              <div 
                                key={permission.id} 
                                className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted/50"
                              >
                                <div className="space-y-1">
                                  <div className="font-medium">{permission.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {permission.description}
                                  </div>
                                </div>
                                <div>
                                  <Switch
                                    checked={permissions[permission.id] || false}
                                    onCheckedChange={() => togglePermission(permission.id)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {filteredPermissionGroups.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No permissions found matching your search.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
