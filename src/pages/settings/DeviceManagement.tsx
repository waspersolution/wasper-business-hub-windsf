
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Smartphone } from "lucide-react";
import { useState } from "react";

type Device = {
  id: string;
  name: string;
  type: string;
  lastSeen: string;
  status: "online" | "offline";
};

const mockDevices: Device[] = [
  { id: "dev-001", name: "Main Counter Tablet", type: "Tablet", lastSeen: "Just now", status: "online" },
  { id: "dev-002", name: "Receipt Printer 1", type: "Printer", lastSeen: "5 minutes ago", status: "online" },
  { id: "dev-003", name: "Barcode Scanner", type: "Scanner", lastSeen: "3 hours ago", status: "offline" },
  { id: "dev-004", name: "Back Office PC", type: "Computer", lastSeen: "Just now", status: "online" },
];

export default function DeviceManagement() {
  const [activeTab, setActiveTab] = useState("devices");
  const [devices] = useState<Device[]>(mockDevices);
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Device Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage devices, printers, and terminals
            </p>
          </div>
          
          <Button>Add New Device</Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="printers">Printers</TabsTrigger>
            <TabsTrigger value="terminals">Terminals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="devices" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>All Devices</CardTitle>
                  <CardDescription>
                    View and manage all connected devices
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.name}</TableCell>
                        <TableCell>{device.type}</TableCell>
                        <TableCell>{device.lastSeen}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            device.status === "online" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}>
                            {device.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="printers" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Printer Configuration</CardTitle>
                  <CardDescription>
                    Configure receipt and label printers
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-printer">Default Receipt Printer</Label>
                    <Select defaultValue="receipt-1">
                      <SelectTrigger id="default-printer">
                        <SelectValue placeholder="Select printer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receipt-1">Receipt Printer 1</SelectItem>
                        <SelectItem value="receipt-2">Receipt Printer 2</SelectItem>
                        <SelectItem value="label-1">Label Printer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-label">Default Label Printer</Label>
                    <Select defaultValue="label-1">
                      <SelectTrigger id="default-label">
                        <SelectValue placeholder="Select printer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="label-1">Label Printer</SelectItem>
                        <SelectItem value="receipt-1">Receipt Printer 1</SelectItem>
                        <SelectItem value="receipt-2">Receipt Printer 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-detect">Auto-Detect Printers</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically detect and connect to printers
                    </p>
                  </div>
                  <Switch id="auto-detect" defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button>Save Printer Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="terminals" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Payment Terminal Configuration</CardTitle>
                  <CardDescription>
                    Configure payment terminals and card readers
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="terminal-type">Terminal Type</Label>
                    <Select defaultValue="integrated">
                      <SelectTrigger id="terminal-type">
                        <SelectValue placeholder="Select terminal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="integrated">Integrated</SelectItem>
                        <SelectItem value="standalone">Standalone</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="terminal-ip">Terminal IP Address</Label>
                    <Input id="terminal-ip" placeholder="192.168.1.100" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="terminal-port">Terminal Port</Label>
                    <Input id="terminal-port" placeholder="9100" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="terminal-provider">Terminal Provider</Label>
                    <Select defaultValue="stripe">
                      <SelectTrigger id="terminal-provider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="sumup">SumUp</SelectItem>
                        <SelectItem value="izettle">iZettle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-connect">Auto-Connect</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically connect to terminal at startup
                    </p>
                  </div>
                  <Switch id="auto-connect" defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button>Test Connection</Button>
                  <Button className="ml-2" variant="outline">Save Terminal Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
