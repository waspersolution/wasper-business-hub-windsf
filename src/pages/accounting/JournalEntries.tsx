
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
import { JournalEntriesFilters } from "./components/JournalEntriesFilters";
import { JournalEntriesTable } from "./components/JournalEntriesTable";
import { JournalEntryDialog } from "./components/JournalEntryDialog";
import { NewJournalEntryDialog } from "./components/NewJournalEntryDialog";

export type JournalEntry = {
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

export type JournalLine = {
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

export const mockJournalLines: Record<string, JournalLine[]> = {
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

export default function JournalEntries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewEntryDialog, setViewEntryDialog] = useState(false);
  const [newEntryDialog, setNewEntryDialog] = useState(false);
  
  const filteredEntries = mockJournalEntries.filter(entry => {
    const matchesSearch = 
      entry.entry_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
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
        
        <JournalEntriesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <JournalEntriesTable
          journalEntries={filteredEntries}
          handleViewEntry={handleViewEntry}
          getStatusColor={getStatusColor}
        />
      </div>
      
      <JournalEntryDialog
        entry={selectedEntry}
        open={viewEntryDialog}
        onOpenChange={setViewEntryDialog}
      />
      
      <NewJournalEntryDialog
        open={newEntryDialog}
        onOpenChange={setNewEntryDialog}
      />
    </DashboardLayout>
  );
}
