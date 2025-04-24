
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface POSOfflineIndicatorProps {
  isOnline: boolean;
}

export default function POSOfflineIndicator({ isOnline }: POSOfflineIndicatorProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow">
      <div className="flex items-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="text-green-600" />
            <span className="text-green-700 font-medium">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="text-yellow-500" />
            <span className="text-yellow-700 font-medium">Offline</span>
          </>
        )}
      </div>
      {!isOnline && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          disabled
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Sync
        </Button>
      )}
    </div>
  );
}
