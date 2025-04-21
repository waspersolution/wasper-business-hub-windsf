
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Filter, 
  Search, 
  Calendar as CalendarIcon, 
  ChevronDown,
  FileEdit,
  Plus,
  Trash,
  Eye,
  History
} from "lucide-react";
import { Card } from "@/components/ui/card";

const mockRecordChanges = [
  {
    id: "CHG001",
    action: "update",
    user: "Jane Doe",
    entity: "Product",
    entityId: "PRD456",
    entityName: "Rice 5kg",
    module: "inventory",
    date: "2025-04-20 09:30",
    changes: [
      { field: "price", oldValue: "₦4,500", newValue: "₦4,800" },
      { field: "stock", oldValue: "25", newValue: "20" }
    ]
  },
  {
    id: "CHG002",
    action: "create",
    user: "Ibrahim Hassan",
    entity: "Customer",
    entityId: "CUST789",
    entityName: "Lagos Grocers Ltd",
    module: "customers",
    date: "2025-04-20 10:15",
    changes: [
      { field: "name", oldValue: "", newValue: "Lagos Grocers Ltd" },
      { field: "email", oldValue: "", newValue: "contact@lagosgrocers.com" },
      { field: "phone", oldValue: "", newValue: "+2348012345678" }
    ]
  },
  {
    id: "CHG003",
    action: "delete",
    user: "Admin System",
    entity: "Discount",
    entityId: "DISC123",
    entityName: "Holiday Discount 10%",
    module: "sales",
    date: "2025-04-20 11:45",
    changes: [
      { field: "name", oldValue: "Holiday Discount 10%", newValue: "" },
      { field: "value", oldValue: "10%", newValue: "" },
      { field: "active", oldValue: "true", newValue: "" }
    ]
  },
  {
    id: "CHG004",
    action: "update",
    user: "Chidi Okafor",
    entity: "Order",
    entityId: "ORD456",
    entityName: "Order #ORD456",
    module: "sales",
    date: "2025-04-20 13:20",
    changes: [
      { field: "status", oldValue: "Pending", newValue: "Completed" },
      { field: "payment_status", oldValue: "Unpaid", newValue: "Paid" }
    ]
  },
  {
    id: "CHG005",
    action: "update",
    user: "Fatima Umar",
    entity: "User",
    entityId: "USR789",
    entityName: "Ibrahim Hassan",
    module: "users",
    date: "2025-04-20 14:30",
    changes: [
      { field: "role", oldValue: "Inventory Manager", newValue: "Branch Manager" },
      { field: "permissions", oldValue: "inventory.view,inventory.edit", newValue: "inventory.view,inventory.edit,sales.view,sales.create" }
    ]
  },
  {
    id: "CHG006",
    action: "create",
    user: "Ibrahim Hassan",
    entity: "Stock Transfer",
    entityId: "TRF123",
    entityName: "Transfer #TRF123",
    module: "inventory",
    date: "2025-04-20 15:40",
    changes: [
      { field: "from_branch", oldValue: "", newValue: "Main Warehouse" },
      { field: "to_branch", oldValue: "", newValue: "Apapa Branch" },
      { field: "items_count", oldValue: "", newValue: "15" }
    ]
  },
];

const actionOptions = [
  { label: "All Actions", value: "all" },
  { label: "Create", value: "create" },
  { label: "Update", value: "update" },
  { label: "Delete", value: "delete" },
];

const moduleOptions = [
  { label: "All Modules", value: "all" },
  { label: "Inventory", value: "inventory" },
  { label: "Sales", value: "sales" },
  { label: "Customers", value: "customers" },
  { label: "Users", value: "users" },
];

export function RecordChanges() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter logs based on search term, action, module, and date
  const filteredRecords = mockRecordChanges.filter(record => {
    const matchesSearch = searchTerm === "" || 
      record.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.user.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesAction = selectedAction === "all" || record.action === selectedAction;
    const matchesModule = selectedModule === "all" || record.module === selectedModule;
    
    const matchesDate = !date || record.date.startsWith(format(date, "yyyy-MM-dd"));
      
    return matchesSearch && matchesAction && matchesModule && matchesDate;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'update':
        return <FileEdit className="h-4 w-4 text-blue-500" />;
      case 'delete':
        return <Trash className="h-4 w-4 text-red-500" />;
      default:
        return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return "bg-green-100 text-green-800 border-green-200";
      case 'update':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'delete':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const viewRecordDetails = (record: any) => {
    setSelectedRecord(record);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by entity name, ID, or user..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-10 gap-1"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isFiltersVisible ? "rotate-180" : ""
          )} />
        </Button>
      </div>
      
      {isFiltersVisible && (
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Action</label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  {actionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Module</label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  {moduleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedAction("all");
                  setSelectedModule("all");
                  setDate(undefined);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead className="hidden md:table-cell">Entity ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Module</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-mono text-xs">{record.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getActionIcon(record.action)}
                    <Badge variant="outline" className={cn("capitalize", getActionColor(record.action))}>
                      {record.action}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{record.entityName}</div>
                    <div className="text-xs text-muted-foreground">{record.entity}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell font-mono">
                  {record.entityId}
                </TableCell>
                <TableCell>{record.user}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="capitalize">
                    {record.module}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {record.date}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => viewRecordDetails(record)}
                  >
                    <History className="h-4 w-4" />
                    View Changes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Record Change Details</DialogTitle>
            <DialogDescription>
              {selectedRecord && (
                <>
                  <div className="flex items-center gap-2 mt-1">
                    {getActionIcon(selectedRecord.action)}
                    <Badge className={cn("capitalize", getActionColor(selectedRecord.action))}>
                      {selectedRecord.action}
                    </Badge>
                    <span className="text-sm"> | </span>
                    <span className="text-sm">{selectedRecord.date}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Entity: {selectedRecord.entityName} ({selectedRecord.entity})</p>
                    <p className="text-sm font-medium">ID: {selectedRecord.entityId}</p>
                    <p className="text-sm">Changed by: {selectedRecord.user}</p>
                  </div>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="mt-4 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Old Value</TableHead>
                    <TableHead>New Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRecord.changes.map((change: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{change.field.replace('_', ' ')}</TableCell>
                      <TableCell className={change.oldValue === "" ? "text-muted-foreground italic" : ""}>
                        {change.oldValue || "None"}
                      </TableCell>
                      <TableCell className={change.newValue === "" ? "text-muted-foreground italic" : ""}>
                        {change.newValue || "None"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
