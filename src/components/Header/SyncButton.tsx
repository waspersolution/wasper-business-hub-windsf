
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

export const SyncButton = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleSyncNow = async () => {
    if (syncing) return;
    
    setSyncing(true);
    toast({
      title: "Syncing...",
      description: "Data sync in progress.",
    });
    
    try {
      await new Promise((res) => setTimeout(res, 2000));
      const now = new Date();
      setLastSyncTime(now);
      
      toast({
        title: "Sync complete!",
        description: `Your data is up to date. Last synced: ${now.toLocaleTimeString()}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "There was an error syncing your data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative group"
      onClick={handleSyncNow}
      disabled={syncing}
      aria-label="Sync Now"
      title={lastSyncTime ? `Last synced: ${lastSyncTime.toLocaleTimeString()}` : "Sync Now"}
    >
      <RefreshCw className={`h-5 w-5 transition-transform ${syncing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
      {lastSyncTime && (
        <span className="sr-only">Last synced: {lastSyncTime.toLocaleTimeString()}</span>
      )}
    </Button>
  );
};
