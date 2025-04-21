import { useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  ChevronDown,
  Edit,
  Trash2,
  Calendar,
  Save,
  Eye
} from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type JournalEntry = {
  id: string;
  entry_number: string;
  date: string;
  description: string;
  total_amount: number;
  is_balanced: boolean;
  status: "draft" | "posted" | "reversed";
  created_by: string;
  created_at: string;
  updated_at: string;
};

type JournalLine = {
  id: string;
  entry_id: string;
  account_code: string;
  account_name: string;
  description?: string;
  debit: number;
  credit: number;
};

const mockJournalEntries: JournalEntry[] = [
  {
    id: "J001",
    entry_number: "JE-2025-0001",
    date: "2025-04-21",
    description: "Monthly rent payment",
    total_amount: 50000,
    is_balanced: true,
    status: "posted",
    created_by: "Jane Smith",
    created_at: "2025-04-21",
    updated_at: "2025-04-21"
  },
  {
    id: "J002",
    entry_number: "JE-2025-0002",
    date: "2025-04-20",
    description: "Purchase of office supplies",
    total_amount: 15000,
    is_balanced: true,
    status: "posted",
    created_by: "John Doe",
    created_at: "2025-04-20",
    updated_at: "2025-04-20"
  },
  {
    id: "J003",
    entry_number: "JE-2025-0003",
    date: "2025-04-19",
    description: "Bank loan interest payment",
    total_amount: 25000,
    is_balanced: true,
    status: "posted",
    created_by: "Jane Smith",
    created_at: "2025-04-19",
    updated_at: "2025-04-19"
  },
  {
    id: "J004",
    entry_number: "JE-2025-0004",
    date: "2025-04-18",
    description: "Staff salary payment",
    total_amount: 350000,
    is_balanced: true,
    status: "draft",
    created_by: "John Doe",
    created_at: "2025-04-18",
    updated_at: "2025-04-18"
  },
  {
    id: "J005",
    entry_number: "JE-2025-0005",
    date: "2025-04-15",
    description: "Invoice correction",
    total_amount: 7500,
    is_balanced: true,
    status: "reversed",
    created_by: "Mike Wilson",
    created_at: "2025-04-15",
    updated_at: "2025-04-17"
  }
];

const mockJournalLines: Record<string, JournalLine[]> = {
  "J001": [
    {
      id: "JL001",
      entry_id: "J001",
      account_code: "6000",
      account_name: "Rent Expense",
      description: "April 2025 Office Rent",
      debit: 50000,
      credit: 0
    },
    {
      id: "JL002",
      entry_id: "J001",
      account_code: "1000",
      account_name: "Cash",
      description: "April 2025 Office Rent",
      debit: 0,
      credit: 50000
    }
  ],
  "J002": [
    {
      id: "JL003",
      entry_id: "J002",
      account_code: "6200",
      account_name: "Office Supplies Expense",
      description: "Purchase of stationery",
      debit: 15000,
      credit: 0
    },
    {
      id: "JL004",
      entry_id: "J002",
      account_code: "1000",
      account_name: "Cash",
      description: "Purchase of stationery",
      debit: 0,
      credit: 15000
    }
  ],
  "J003": [
    {
      id: "JL005",
      entry_id: "J003",
      account_code: "6300",
      account_name: "Interest Expense",
      description: "Monthly loan interest payment",
      debit: 25000,
      credit: 0
    },
    {
      id: "JL006",
      entry_id: "J003",
      account_code: "1010",
      account_name: "Bank Account",
      description: "Monthly loan interest payment",
      debit: 0,
      credit: 25000
    }
  ],
  "J004": [
    {
      id: "JL007",
      entry_id: "J004",
      account_code: "6100",
      account_name: "Salary Expense",
      description: "Staff salary April 2025",
      debit: 350000,
      credit: 0
    },
    {
      id: "JL008",
      entry_id: "J004",
      account_code: "1010",
      account_name: "Bank Account",
      description: "Staff salary April 2025",
      debit: 0,
      credit: 350000
    }
  ],
  "J005": [
    {
      id: "JL009",
      entry_id: "J005",
      account_code: "1200",
      account_name: "Accounts Receivable",
      description: "Invoice #INV-452 correction",
      debit: 0,
      credit: 7500
    },
    {
      id: "JL010",
      entry_id: "J005",
      account_code: "4000",
      account_name: "Sales Revenue",
      description: "Invoice #INV-452 correction",
      debit: 7500,
      credit: 0
    }
  ]
};

const JournalEntryDialog = ({ entry, open, onOpenChange }) => {
  if (!entry) return null;
  
  const lines = mockJournalLines[entry.id] || [];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <BookOpen size={20} />
            Journal Entry - {entry.entry_number}
          </DialogTitle>
          <DialogDescription>
            Created on {entry.created_at} by {entry.created_by}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Date</div>
              <div className="font-medium">{entry.date}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Status</div>
              <div>
                <Badge
                  variant={
                    entry.status === "posted"
                      ? "success"
                      : entry.status === "draft"
                      ? "outline"
                      : "warning"
                  }
                >
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Amount</div>
              <div className="font-medium">₦{entry.total_amount.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Description</div>
            <div className="font-medium">{entry.description}</div>
          </div>
          
          <Separator />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Code</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>{line.account_code}</TableCell>
                    <TableCell>{line.account_name}</TableCell>
                    <TableCell>{line.description}</TableCell>
                    <TableCell className="text-right font-mono">
                      {line.debit > 0 ? `₦${line.debit.toLocaleString()}` : ""}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {line.credit > 0 ? `₦${line.credit.toLocaleString()}` : ""}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ₦{lines.reduce((sum, line) => sum + line.debit, 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ₦{lines.reduce((sum, line) => sum + line.credit, 0).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
        <DialogFooter>
          {entry.status === "draft" && (
            <>
              <Button variant="outline">Edit</Button>
              <Button variant="success">Post Entry</Button>
            </>
          )}
          {entry.status === "posted" && !entry.id.includes("J005") && (
            <Button variant="destructive">Reverse Entry</Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function JournalEntries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewEntryDialog, setViewEntryDialog] = useState(false);
  const [newEntryDialog, setNewEntryDialog] = useState(false);
  
  const filteredEntries = mockJournalEntries.filter(entry => {
    const matchesSearch = 
      entry.entry_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setViewEntryDialog(true);
  };
  
  const getStatusColor = (status: "draft" | "posted" | "reversed") => {
    switch (status) {
      case "posted": return "success";
      case "draft": return "outline";
      case "reversed": return "warning";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Journal Entries</h1>
            <p className="text-muted-foreground">Manage and track all accounting entries</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            
            <Button onClick={() => setNewEntryDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Journal Entry
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Posted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {mockJournalEntries.filter(e => e.status === "posted").length}
              </div>
              <p className="text-sm text-muted-foreground">
                Posted journal entries
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Draft Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">
                {mockJournalEntries.filter(e => e.status === "draft").length}
              </div>
              <p className="text-sm text-muted-foreground">
                Pending journal entries
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">
                {mockJournalEntries.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Entries this month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-1/3">
                <Input
                  placeholder="Search by entry number or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  prefix={<Search className="mr-2 h-4 w-4 text-muted-foreground" />}
                />
              </div>
              
              <div className="w-full sm:w-1/4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="posted">Posted</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="reversed">Reversed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 ml-auto">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      More Filters
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Journal Entry Type</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="recurring">Recurring</SelectItem>
                            <SelectItem value="adjusting">Adjusting</SelectItem>
                            <SelectItem value="closing">Closing</SelectItem>
                            <SelectItem value="reversing">Reversing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Created By</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="jane">Jane Smith</SelectItem>
                            <SelectItem value="john">John Doe</SelectItem>
                            <SelectItem value="mike">Mike Wilson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Amount Range</h4>
                        <div className="flex gap-2">
                          <Input type="number" className="w-full" placeholder="Min" />
                          <Input type="number" className="w-full" placeholder="Max" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Reset</Button>
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Journal Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden lg:table-cell">Created By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.entry_number}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {entry.description}
                      </TableCell>
                      <TableCell className="font-mono">
                        ₦{entry.total_amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{entry.created_by}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(entry.status)}>
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleViewEntry(entry)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <JournalEntryDialog
        entry={selectedEntry}
        open={viewEntryDialog}
        onOpenChange={setViewEntryDialog}
      />
      
      <Dialog open={newEntryDialog} onOpenChange={setNewEntryDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>New Journal Entry</DialogTitle>
            <DialogDescription>
              Create a new manual journal entry
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="entry-date" className="text-sm font-medium">Date</label>
                <Input id="entry-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="space-y-2">
                <label htmlFor="entry-reference" className="text-sm font-medium">Reference (Optional)</label>
                <Input id="entry-reference" placeholder="e.g., INV-001 or Payment #123" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="entry-description" className="text-sm font-medium">Description</label>
              <Textarea id="entry-description" placeholder="Enter a detailed description" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Journal Lines</label>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Line
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ width: "30%" }}>Account</TableHead>
                      <TableHead style={{ width: "30%" }}>Description</TableHead>
                      <TableHead style={{ width: "15%" }} className="text-right">Debit</TableHead>
                      <TableHead style={{ width: "15%" }} className="text-right">Credit</TableHead>
                      <TableHead style={{ width: "10%" }}></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1000">1000 - Cash</SelectItem>
                            <SelectItem value="1010">1010 - Bank Account</SelectItem>
                            <SelectItem value="1200">1200 - Accounts Receivable</SelectItem>
                            <SelectItem value="2000">2000 - Accounts Payable</SelectItem>
                            <SelectItem value="4000">4000 - Sales Revenue</SelectItem>
                            <SelectItem value="5000">5000 - Cost of Goods Sold</SelectItem>
                            <SelectItem value="6000">6000 - Rent Expense</SelectItem>
                            <SelectItem value="6100">6100 - Utilities Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Line description" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min="0" placeholder="0.00" className="text-right" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min="0" placeholder="0.00" className="text-right" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1000">1000 - Cash</SelectItem>
                            <SelectItem value="1010">1010 - Bank Account</SelectItem>
                            <SelectItem value="1200">1200 - Accounts Receivable</SelectItem>
                            <SelectItem value="2000">2000 - Accounts Payable</SelectItem>
                            <SelectItem value="4000">4000 - Sales Revenue</SelectItem>
                            <SelectItem value="5000">5000 - Cost of Goods Sold</SelectItem>
                            <SelectItem value="6000">6000 - Rent Expense</SelectItem>
                            <SelectItem value="6100">6100 - Utilities Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Line description" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min="0" placeholder="0.00" className="text-right" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min="0" placeholder="0.00" className="text-right" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={2} className="text-right font-medium">Total</TableCell>
                      <TableCell className="text-right font-mono font-medium">₦0.00</TableCell>
                      <TableCell className="text-right font-mono font-medium">₦0.00</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} className="text-right font-medium">Difference</TableCell>
                      <TableCell colSpan={2} className="text-center font-medium text-yellow-600">₦0.00</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                * Total debits must equal total credits for the entry to be balanced
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline">Save as Draft</Button>
            <Button>Create & Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
