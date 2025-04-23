
import { useLocation } from "react-router-dom";
import { useSession } from "@/contexts/SessionContext";
import { CommandSearch } from "@/components/CommandSearch";
import { UserMenu } from "@/components/Header/UserMenu";
import { SyncButton } from "@/components/Header/SyncButton";
import { AuthButtons } from "@/components/Header/AuthButtons";
import { BranchSelector } from "@/components/Header/BranchSelector";
import { useEffect, useState } from "react";

export function Header() {
  const { session } = useSession();
  const location = useLocation();
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Auto sync functionality - runs in background every 5 minutes
  useEffect(() => {
    if (!session.isAuthenticated || !location.pathname.startsWith("/dashboard")) {
      return;
    }
    
    const handleAutoSync = async () => {
      if (syncing) return;
      
      try {
        setSyncing(true);
        await new Promise((res) => setTimeout(res, 1500));
        setLastSyncTime(new Date());
      } finally {
        setSyncing(false);
      }
    };
    
    // Initial sync when component mounts
    handleAutoSync();
    
    // Set up interval for auto sync
    const interval = setInterval(handleAutoSync, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [session.isAuthenticated, location.pathname, syncing]);

  // Only show Sync if authenticated and on dashboard or child pages
  const showSyncButton =
    session.isAuthenticated &&
    location.pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4">
            {session.isAuthenticated && (
              <>
                <BranchSelector />
                <div className="hidden md:block">
                  <CommandSearch />
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showSyncButton && <SyncButton />}
            {session.isAuthenticated ? (
              <UserMenu />
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
