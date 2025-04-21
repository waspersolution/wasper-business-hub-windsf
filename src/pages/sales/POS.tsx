
import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff, RotateCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Enhanced mock sales with sync status
const mockSales = [
  {
    id: "S001",
    customer: "Acme Corp",
    total: 12000,
    payment_method: "card",
    status: "completed",
    created_at: "2025-04-21",
    sync_status: "synced"
  },
  {
    id: "S002",
    customer: "Jane Doe",
    total: 5000,
    payment_method: "cash",
    status: "pending",
    created_at: "2025-04-21",
    sync_status: "pending"
  },
  {
    id: "S003",
    customer: "XYZ Foods",
    total: 6700,
    payment_method: "transfer",
    status: "completed",
    created_at: "2025-04-20",
    sync_status: "synced"
  }
];

export default function POS() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingSales, setPendingSales] = useState<number>(0);
  const [sales, setSales] = useState(mockSales);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "You're back online",
        description: "You can now sync your offline sales.",
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Sales will be saved locally and synced when you're back online.",
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Count pending sales on load
    const pendingCount = mockSales.filter(sale => sale.sync_status === "pending").length;
    setPendingSales(pendingCount);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Function to sync offline sales
  const syncOfflineSales = async () => {
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Cannot sync sales while offline.",
        variant: "destructive"
      });
      return;
    }

    setIsSyncing(true);
    
    try {
      // Simulate API call to sync pending sales
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update UI to reflect synced sales
      const updatedSales = sales.map(sale => {
        if (sale.sync_status === "pending") {
          return { ...sale, sync_status: "synced" };
        }
        return sale;
      });
      
      setSales(updatedSales);
      setPendingSales(0);
      
      toast({
        title: "Sales synced successfully",
        description: "All offline sales have been uploaded to the server.",
      });
    } catch (error) {
      console.error("Sync failed:", error);
      toast({
        title: "Sync failed",
        description: "There was a problem syncing your sales. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Point of Sale (POS)</h1>
        
        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center gap-1 text-green-600">
              <Wifi className="h-4 w-4" />
              <span className="text-sm">Online</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-amber-600">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm">Offline</span>
            </div>
          )}
          
          {pendingSales > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={syncOfflineSales}
              disabled={!isOnline || isSyncing}
            >
              <RotateCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              Sync Now ({pendingSales})
            </Button>
          )}
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sale ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Sync Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.customer}</TableCell>
              <TableCell>₦{sale.total.toLocaleString()}</TableCell>
              <TableCell>{sale.payment_method}</TableCell>
              <TableCell>
                <span
                  className={
                    sale.status === "completed"
                      ? "text-green-700"
                      : sale.status === "pending"
                      ? "text-yellow-700"
                      : "text-gray-700"
                  }
                >
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{sale.created_at}</TableCell>
              <TableCell>
                <span
                  className={
                    sale.sync_status === "synced"
                      ? "text-green-700"
                      : "text-amber-700"
                  }
                >
                  {sale.sync_status === "synced" ? "Synced ✓" : "Pending..."}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
