
import { User, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface POSHeaderProps {
  isOnline: boolean;
  isMobile: boolean;
}

export default function POSHeader({ isOnline, isMobile }: POSHeaderProps) {
  if (!isMobile) return null;
  
  return (
    <div className="bg-white p-3 shadow-sm flex items-center justify-between mb-4 rounded-lg">
      <h1 className="text-lg font-bold text-wasper-primary">Wasper POS</h1>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="text-green-600 h-5 w-5" />
        ) : (
          <WifiOff className="text-yellow-500 h-5 w-5" />
        )}
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
