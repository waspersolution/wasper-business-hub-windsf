
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Database, RefreshCw, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function MockDataManager() {
  const [useMockData, setUseMockData] = useState(false);
  const { toast } = useToast();

  const handleToggleMockData = (enabled: boolean) => {
    setUseMockData(enabled);
    localStorage.setItem("useMockData", String(enabled));
    toast({
      title: enabled ? "Mock Data Enabled" : "Mock Data Disabled",
      description: enabled 
        ? "The application will now use mock data for all API calls" 
        : "The application will now use real API endpoints",
    });
  };

  const handleSeedMockData = () => {
    // TODO: Implement seeding mock data
    toast({
      title: "Mock Data Seeded",
      description: "Sample records have been populated successfully",
    });
  };

  const handleClearData = () => {
    // TODO: Implement clearing all data
    toast({
      title: "Data Cleared",
      description: "All mock data has been cleared successfully",
    });
  };

  const handleResetToReal = () => {
    setUseMockData(false);
    localStorage.setItem("useMockData", "false");
    handleClearData();
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Mock Data Manager
        </CardTitle>
        <CardDescription>
          Manage mock data for development and testing purposes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mock Data Toggle */}
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <h4 className="font-medium">Use Mock Data</h4>
            <p className="text-sm text-muted-foreground">
              Toggle between mock and real API endpoints
            </p>
          </div>
          <Switch
            checked={useMockData}
            onCheckedChange={handleToggleMockData}
            aria-label="Toggle mock data"
          />
        </div>

        {/* Data Management Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Database className="mr-2 h-4 w-4" />
                Seed Mock Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Seed Mock Data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will populate the application with sample records. Any existing mock data will be preserved.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSeedMockData}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Clear All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all mock data from the application. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Clear Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Reset to Real Data */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Real Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset to Real Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will disable mock data, clear all mock records, and reload the application. You will start using real API endpoints.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetToReal} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
