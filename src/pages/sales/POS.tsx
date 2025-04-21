
import { useState } from "react";
import { Wifi, WifiOff, Sync } from "lucide-react";
import { Button } from "@/components/ui/button";
import POSAddItem from "./POSAddItem";
import POSCart from "./POSCart";
import POSSummary from "./POSSummary";

export default function POS() {
  // Demo online/offline UI only
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full min-h-[80vh]">
      {/* Left: Add Item and Cart */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Add Item area */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-2">
          <POSAddItem />
        </div>
        {/* Cart section */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex-1">
          <POSCart />
        </div>
      </div>

      {/* Right: Summary & Status */}
      <div className="w-full md:max-w-xs flex flex-col gap-4">
        {/* Offline/Sync status */}
        <div className="flex items-center justify-between bg-soft-purple rounded-xl px-4 py-3 mb-2 shadow">
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
              <Sync className="h-4 w-4 animate-spin" />
              Sync
            </Button>
          )}
        </div>
        {/* Sales summary/payment */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex-1">
          <POSSummary />
        </div>
      </div>
    </div>
  );
}
