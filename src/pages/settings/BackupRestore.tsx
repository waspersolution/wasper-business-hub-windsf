
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Upload, Calendar, Clock, Database, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function BackupRestore() {
  const [isBackupInProgress, setIsBackupInProgress] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [backupTime, setBackupTime] = useState("02:00");
  const [backupDay, setBackupDay] = useState("sunday");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isTestRestore, setIsTestRestore] = useState(true);
  const [lastBackupDate, setLastBackupDate] = useState<string | null>("2025-04-20 14:30:00");

  const handleBackupNow = () => {
    setIsBackupInProgress(true);
    
    // Simulate backup process
    setTimeout(() => {
      setIsBackupInProgress(false);
      setLastBackupDate(new Date().toLocaleString());
      toast.success("Backup completed successfully");
      
      // Trigger download of backup file
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify({ backup: "data", date: new Date().toISOString() })], {type: 'application/json'});
      element.href = URL.createObjectURL(file);
      element.download = `wasper_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 3000);
  };

  const handleRestoreConfirm = () => {
    if (!selectedFile) {
      toast.error("Please select a backup file first");
      return;
    }
    
    setIsRestoreDialogOpen(false);
    
    // Show progress notification
    toast.loading("Restoring your data. This may take a few minutes...");
    
    // Simulate restore process
    setTimeout(() => {
      toast.dismiss();
      toast.success(`${isTestRestore ? "Test restore" : "Restore"} completed successfully`);
    }, 5000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Backup & Restore</h1>
        
        <Tabs defaultValue="backup">
          <TabsList className="mb-6 w-full max-w-md">
            <TabsTrigger value="backup" className="flex-1">System Backup</TabsTrigger>
            <TabsTrigger value="restore" className="flex-1">System Restore</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backup">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Manual Backup
                  </CardTitle>
                  <CardDescription>
                    Create an on-demand backup of your entire system data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {lastBackupDate && (
                    <Alert className="mb-4 bg-muted/50">
                      <Clock className="h-4 w-4" />
                      <AlertTitle>Last backup</AlertTitle>
                      <AlertDescription>
                        {lastBackupDate}
                      </AlertDescription>
                    </Alert>
                  )}
                  <p className="mb-4 text-sm text-muted-foreground">
                    Your backup will include all products, sales, purchases, customer data, 
                    and settings. The backup file will be downloaded to your device.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleBackupNow} 
                    disabled={isBackupInProgress}
                    className="w-full"
                  >
                    {isBackupInProgress ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Backup in progress...
                      </>
                    ) : (
                      <>Backup Now</>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Automatic Backup Schedule
                  </CardTitle>
                  <CardDescription>
                    Configure regular automatic backups of your system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Backup Frequency</label>
                    <Select 
                      value={backupFrequency} 
                      onValueChange={setBackupFrequency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {backupFrequency === "weekly" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Day of Week</label>
                      <Select 
                        value={backupDay} 
                        onValueChange={setBackupDay}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunday">Sunday</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Backup Time</label>
                    <Input 
                      type="time" 
                      value={backupTime}
                      onChange={(e) => setBackupTime(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      It's recommended to schedule backups during off-hours
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Save Schedule
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="restore">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  System Restore
                </CardTitle>
                <CardDescription>
                  Restore your system from a previous backup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning: Data Replacement</AlertTitle>
                  <AlertDescription>
                    Restoring from a backup will replace ALL current data. This action cannot be undone.
                    Make sure to create a backup of your current system before proceeding.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Backup File</label>
                  <Input 
                    type="file" 
                    accept=".json,.bak"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Only upload backup files created by this system
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="test-restore" 
                    checked={isTestRestore}
                    onChange={(e) => setIsTestRestore(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="test-restore" className="text-sm">
                    Test restore only (verify backup without applying changes)
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="destructive" 
                  onClick={() => setIsRestoreDialogOpen(true)}
                  disabled={!selectedFile}
                  className="w-full"
                >
                  <Database className="mr-2 h-4 w-4" />
                  {isTestRestore ? "Test Restore" : "Restore System"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <AlertDialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isTestRestore ? "Confirm Test Restore" : "Confirm System Restore"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isTestRestore ? (
                  "This will verify your backup file without making any changes to your system."
                ) : (
                  <span className="text-red-500 font-semibold">
                    WARNING: This will replace ALL your current data with the backup data.
                    This action cannot be undone. Are you sure you want to proceed?
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleRestoreConfirm}
                className={isTestRestore ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"}
              >
                {isTestRestore ? "Run Test Restore" : "Yes, Restore System"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
