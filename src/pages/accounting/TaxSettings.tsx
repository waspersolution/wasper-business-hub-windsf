
import { useState } from "react";
import { 
  Percent, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Info
} from "lucide-react";
import { Layout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type TaxRate = {
  id: string;
  name: string;
  rate: number;
  code: string;
  is_inclusive: boolean;
  is_default: boolean;
  is_active: boolean;
  applies_to_sales: boolean;
  applies_to_purchases: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
};

const mockTaxRates: TaxRate[] = [
  {
    id: "T001",
    name: "Value Added Tax (VAT)",
    rate: 7.5,
    code: "VAT",
    is_inclusive: false,
    is_default: true,
    is_active: true,
    applies_to_sales: true,
    applies_to_purchases: true,
    description: "Standard VAT rate for Nigeria",
    created_at: "2025-01-01",
    updated_at: "2025-01-01"
  },
  {
    id: "T002",
    name: "Withholding Tax (WHT)",
    rate: 5,
    code: "WHT",
    is_inclusive: false,
    is_default: false,
    is_active: true,
    applies_to_sales: true,
    applies_to_purchases: true,
    description: "Standard withholding tax rate",
    created_at: "2025-01-01",
    updated_at: "2025-01-01"
  },
  {
    id: "T003",
    name: "Zero Rate",
    rate: 0,
    code: "ZERO",
    is_inclusive: false,
    is_default: false,
    is_active: true,
    applies_to_sales: true,
    applies_to_purchases: true,
    description: "Zero-rated items",
    created_at: "2025-01-01",
    updated_at: "2025-01-01"
  },
  {
    id: "T004",
    name: "Sales Tax",
    rate: 5,
    code: "SALES",
    is_inclusive: true,
    is_default: false,
    is_active: true,
    applies_to_sales: true,
    applies_to_purchases: false,
    description: "Special sales tax for certain products",
    created_at: "2025-01-01",
    updated_at: "2025-01-01"
  },
  {
    id: "T005",
    name: "Exempt",
    rate: 0,
    code: "EXEMPT",
    is_inclusive: false,
    is_default: false,
    is_active: true,
    applies_to_sales: true,
    applies_to_purchases: true,
    description: "Tax exempt items",
    created_at: "2025-01-01",
    updated_at: "2025-01-01"
  }
];

export default function TaxSettings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newTaxDialog, setNewTaxDialog] = useState(false);
  const [editTaxDialog, setEditTaxDialog] = useState(false);
  const [selectedTax, setSelectedTax] = useState<TaxRate | null>(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  
  const filteredTaxRates = mockTaxRates.filter(tax => {
    const matchesSearch = 
      tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tax.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });
  
  const handleEditTax = (tax: TaxRate) => {
    setSelectedTax(tax);
    setEditTaxDialog(true);
  };
  
  const handleDeleteTax = (tax: TaxRate) => {
    setSelectedTax(tax);
    setConfirmDeleteDialog(true);
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Tax Settings</h1>
            <p className="text-muted-foreground">Manage tax rates and configurations</p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => setNewTaxDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Tax Rate
            </Button>
          </div>
        </div>
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Tax Configuration</AlertTitle>
          <AlertDescription>
            Configure tax rates that apply to your business transactions. Proper tax settings ensure accurate financial reporting and compliance.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="rates">
          <TabsList className="grid grid-cols-4 w-full md:w-1/2">
            <TabsTrigger value="rates">Tax Rates</TabsTrigger>
            <TabsTrigger value="groups">Tax Groups</TabsTrigger>
            <TabsTrigger value="defaults">Defaults</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rates" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Search Tax Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search tax rates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                    prefix={<Search className="mr-2 h-4 w-4 text-muted-foreground" />}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Tax Rates</CardTitle>
                <CardDescription>
                  Manage your tax rates for sales and purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead className="text-right">Rate (%)</TableHead>
                        <TableHead className="hidden md:table-cell">Inclusive</TableHead>
                        <TableHead className="hidden md:table-cell">Sales</TableHead>
                        <TableHead className="hidden md:table-cell">Purchases</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTaxRates.map((tax) => (
                        <TableRow key={tax.id}>
                          <TableCell className="font-medium">
                            {tax.name}
                            {tax.is_default && (
                              <Badge variant="outline" className="ml-2">Default</Badge>
                            )}
                          </TableCell>
                          <TableCell>{tax.code}</TableCell>
                          <TableCell className="text-right font-mono">{tax.rate}%</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tax.is_inclusive ? 
                              <Check className="h-4 w-4 text-green-500" /> : 
                              <X className="h-4 w-4 text-red-500" />
                            }
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tax.applies_to_sales ? 
                              <Check className="h-4 w-4 text-green-500" /> : 
                              <X className="h-4 w-4 text-red-500" />
                            }
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tax.applies_to_purchases ? 
                              <Check className="h-4 w-4 text-green-500" /> : 
                              <X className="h-4 w-4 text-red-500" />
                            }
                          </TableCell>
                          <TableCell>
                            <Badge variant={tax.is_active ? "success" : "outline"}>
                              {tax.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button
                              onClick={() => handleEditTax(tax)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteTax(tax)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-4 pt-4">
            <Card className="p-6">
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Tax Groups Feature Coming Soon</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  The tax groups feature will allow you to combine multiple tax rates for complex tax scenarios.
                  This feature is currently under development.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="defaults" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Default Tax Settings</CardTitle>
                <CardDescription>
                  Configure default tax behavior for your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border">
                    <div>
                      <h3 className="font-medium">Default Sales Tax</h3>
                      <p className="text-sm text-muted-foreground">Tax applied to new sales by default</p>
                    </div>
                    <Select defaultValue="T001">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select tax" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTaxRates.map(tax => (
                          <SelectItem key={tax.id} value={tax.id}>
                            {tax.name} ({tax.rate}%)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border">
                    <div>
                      <h3 className="font-medium">Default Purchase Tax</h3>
                      <p className="text-sm text-muted-foreground">Tax applied to new purchases by default</p>
                    </div>
                    <Select defaultValue="T001">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select tax" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTaxRates.map(tax => (
                          <SelectItem key={tax.id} value={tax.id}>
                            {tax.name} ({tax.rate}%)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border">
                    <div>
                      <h3 className="font-medium">Tax Calculation Method</h3>
                      <p className="text-sm text-muted-foreground">How tax is calculated on line items</p>
                    </div>
                    <Select defaultValue="line">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Item Level</SelectItem>
                        <SelectItem value="total">Document Total Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border">
                    <div>
                      <h3 className="font-medium">Round Tax Calculations</h3>
                      <p className="text-sm text-muted-foreground">Round tax amounts to nearest whole number</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border">
                    <div>
                      <h3 className="font-medium">Show Tax Details on Invoices</h3>
                      <p className="text-sm text-muted-foreground">Display tax breakdown on customer invoices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Reports</CardTitle>
                <CardDescription>
                  Generate tax reports for compliance and filing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">VAT Summary Report</CardTitle>
                      <CardDescription>
                        Summary of VAT collected and paid
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
                            <Input id="start-date" type="date" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
                            <Input id="end-date" type="date" />
                          </div>
                        </div>
                        <Button className="w-full">Generate Report</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Withholding Tax Report</CardTitle>
                      <CardDescription>
                        Summary of withholding taxes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="wht-start-date" className="text-sm font-medium">Start Date</label>
                            <Input id="wht-start-date" type="date" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="wht-end-date" className="text-sm font-medium">End Date</label>
                            <Input id="wht-end-date" type="date" />
                          </div>
                        </div>
                        <Button className="w-full">Generate Report</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* New Tax Rate Dialog */}
      <Dialog open={newTaxDialog} onOpenChange={setNewTaxDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Tax Rate</DialogTitle>
            <DialogDescription>
              Create a new tax rate for sales and purchases
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="tax-name" className="text-sm font-medium">Tax Name</label>
                <Input id="tax-name" placeholder="e.g., Value Added Tax (VAT)" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="tax-code" className="text-sm font-medium">Tax Code</label>
                  <Input id="tax-code" placeholder="e.g., VAT" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="tax-rate" className="text-sm font-medium">Tax Rate (%)</label>
                  <Input 
                    id="tax-rate" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00"
                    suffix={<Percent className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tax-description" className="text-sm font-medium">Description (Optional)</label>
                <Input id="tax-description" placeholder="Brief description of this tax rate" />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="tax-inclusive"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Tax Inclusive
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Prices include this tax
                    </p>
                  </div>
                  <Switch id="tax-inclusive" />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="tax-default"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Set as Default
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Make this the default tax
                    </p>
                  </div>
                  <Switch id="tax-default" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="tax-sales"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Apply to Sales
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Use for sales transactions
                    </p>
                  </div>
                  <Switch id="tax-sales" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="tax-purchases"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Apply to Purchases
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Use for purchase transactions
                    </p>
                  </div>
                  <Switch id="tax-purchases" defaultChecked />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTaxDialog(false)}>
              Cancel
            </Button>
            <Button>Create Tax Rate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Tax Rate Dialog */}
      <Dialog open={editTaxDialog} onOpenChange={setEditTaxDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Tax Rate</DialogTitle>
            <DialogDescription>
              Modify the tax rate details
            </DialogDescription>
          </DialogHeader>
          {selectedTax && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-tax-name" className="text-sm font-medium">Tax Name</label>
                  <Input id="edit-tax-name" defaultValue={selectedTax.name} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-tax-code" className="text-sm font-medium">Tax Code</label>
                    <Input id="edit-tax-code" defaultValue={selectedTax.code} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-tax-rate" className="text-sm font-medium">Tax Rate (%)</label>
                    <Input 
                      id="edit-tax-rate" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      defaultValue={selectedTax.rate}
                      suffix={<Percent className="h-4 w-4 text-muted-foreground" />}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-tax-description" className="text-sm font-medium">Description (Optional)</label>
                  <Input id="edit-tax-description" defaultValue={selectedTax.description} />
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <label
                        htmlFor="edit-tax-inclusive"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tax Inclusive
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Prices include this tax
                      </p>
                    </div>
                    <Switch id="edit-tax-inclusive" defaultChecked={selectedTax.is_inclusive} />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <label
                        htmlFor="edit-tax-default"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Set as Default
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Make this the default tax
                      </p>
                    </div>
                    <Switch id="edit-tax-default" defaultChecked={selectedTax.is_default} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <label
                        htmlFor="edit-tax-sales"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Apply to Sales
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Use for sales transactions
                      </p>
                    </div>
                    <Switch id="edit-tax-sales" defaultChecked={selectedTax.applies_to_sales} />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <label
                        htmlFor="edit-tax-purchases"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Apply to Purchases
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Use for purchase transactions
                      </p>
                    </div>
                    <Switch id="edit-tax-purchases" defaultChecked={selectedTax.applies_to_purchases} />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 rounded-lg border p-3">
                  <div className="flex-1 space-y-0.5">
                    <label
                      htmlFor="edit-tax-active"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Active
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Tax rate is available for use
                    </p>
                  </div>
                  <Switch id="edit-tax-active" defaultChecked={selectedTax.is_active} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTaxDialog(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Tax Rate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tax rate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedTax && (
            <div className="py-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">{selectedTax.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Code: {selectedTax.code}</p>
                <p className="text-sm text-muted-foreground">Rate: {selectedTax.rate}%</p>
              </div>
              
              {selectedTax.is_default && (
                <Alert className="mt-4" variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This is a default tax rate. Deleting it may affect your system configuration.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              Delete Tax Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
