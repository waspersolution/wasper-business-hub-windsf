
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
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
  AlertTriangle, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  ChevronDown, 
  ClipboardList, 
  Download, 
  Filter, 
  LogIn, 
  Search, 
  ShieldAlert, 
  UserCog, 
  XCircle 
} from "lucide-react";
import { UserActivities } from "./UserActivities";
import { LoginHistory } from "./LoginHistory";
import { RecordChanges } from "./RecordChanges";

export default function AuditLogs() {
  const [activeTab, setActiveTab] = useState("user-activities");
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
            <p className="text-muted-foreground mt-1">
              Track system activities, user actions, and record changes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="user-activities" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" /> User Activities
            </TabsTrigger>
            <TabsTrigger value="login-history" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Login History
            </TabsTrigger>
            <TabsTrigger value="record-changes" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" /> Record Changes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user-activities" className="space-y-4">
            <UserActivities />
          </TabsContent>
          
          <TabsContent value="login-history" className="space-y-4">
            <LoginHistory />
          </TabsContent>
          
          <TabsContent value="record-changes" className="space-y-4">
            <RecordChanges />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
