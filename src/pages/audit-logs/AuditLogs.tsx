
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { Search, Filter } from "lucide-react";

const mockAuditLogs = [
  {
    id: "LOG001",
    action: "User login",
    user: "Jane Doe",
    detail: "User Jane logged in",
    date: "2025-04-20 09:31",
    role: "admin",
    ip: "192.168.1.45"
  },
  {
    id: "LOG002",
    action: "Sale posted",
    user: "Chidi Okafor",
    detail: "Sale S001 recorded - ₦24,500",
    date: "2025-04-20 10:02",
    role: "sales_manager",
    ip: "192.168.1.23"
  },
  {
    id: "LOG003",
    action: "Stock adjustment",
    user: "Ibrahim Hassan",
    detail: "Adjusted Rice -5 units due to damage",
    date: "2025-04-20 11:15",
    role: "inventory_manager",
    ip: "192.168.1.87"
  },
  {
    id: "LOG004",
    action: "User permission change",
    user: "Admin System",
    detail: "Changed role for Ibrahim to Branch Manager",
    date: "2025-04-20 13:20",
    role: "super_admin",
    ip: "192.168.1.1"
  },
  {
    id: "LOG005",
    action: "Order created",
    user: "Fatima Umar",
    detail: "Created order PO-2025-042 for ₦156,000",
    date: "2025-04-20 14:05",
    role: "purchase_manager",
    ip: "192.168.1.32"
  },
  {
    id: "LOG006",
    action: "Branch transfer",
    user: "Ibrahim Hassan",
    detail: "Transferred 15 cartons to Apapa Branch",
    date: "2025-04-20 15:47",
    role: "branch_manager",
    ip: "192.168.1.87"
  },
  {
    id: "LOG007",
    action: "System backup",
    user: "System",
    detail: "Automatic daily backup completed",
    date: "2025-04-20 23:00",
    role: "system",
    ip: "localhost"
  },
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  
  const actionTypes = Array.from(new Set(mockAuditLogs.map(log => log.action)));
  
  // Filter logs based on search term and selected actions
  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = searchTerm === "" || 
      log.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesAction = selectedActions.length === 0 || 
      selectedActions.includes(log.action);
      
    return matchesSearch && matchesAction;
  });

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-xl font-bold mb-4">Audit Logs</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="mb-4 overflow-x-auto">
          <ToggleGroup type="multiple" value={selectedActions} onValueChange={setSelectedActions}>
            {actionTypes.map(action => (
              <ToggleGroupItem key={action} value={action} size="sm" variant="outline">
                {action}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="hidden md:table-cell">IP Address</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.id}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100">
                      {log.role}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">{log.detail}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{log.ip}</TableCell>
                  <TableCell className="whitespace-nowrap">{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  </div>
  );
}
