
import { Link, useLocation } from "react-router-dom";
import { useSession } from "@/contexts/SessionContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleSwitcher } from "../RoleSwitcher";
import { useBranchSelection } from "@/hooks/use-branch-selection";
import { Building, ChevronDown, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { CommandSearch } from "@/components/CommandSearch";

export function Header() {
  const { session, clearSession } = useSession();
  const { currentBranch, branches, switchBranch } = useBranchSelection();
  const { toast } = useToast();
  const location = useLocation();
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Auto sync functionality - runs in background every 5 minutes
  useEffect(() => {
    // Only set up auto sync if user is authenticated and on dashboard
    if (!session.isAuthenticated || !location.pathname.startsWith("/dashboard")) {
      return;
    }
    
    // Initial sync when component mounts
    handleAutoSync();
    
    // Set up interval for auto sync
    const interval = setInterval(handleAutoSync, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [session.isAuthenticated, location.pathname]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!session.isAuthenticated) return "?";
    // This is a placeholder - in a real app you would use the user's name
    return "WB";
  };

  // Handle logout
  const handleLogout = () => {
    clearSession();
    // Redirect to login page
    window.location.href = "/login";
  };

  // Handle branch switching
  const handleBranchSwitch = (branchId: string) => {
    switchBranch(branchId);
    toast({
      title: "Branch switched",
      description: `Branch switched to ${branches.find(b => b.id === branchId)?.name}`,
      variant: "default"
    });
  };

  // Handle automatic sync (background sync)
  const handleAutoSync = async () => {
    if (syncing) return; // Don't start a new sync if one is already in progress
    
    try {
      // Perform sync silently (no toast at start)
      setSyncing(true);
      
      // Placeholder for sync logic
      await new Promise((res) => setTimeout(res, 1500));
      
      // Update last sync time
      const now = new Date();
      setLastSyncTime(now);
      
      // Toast for auto-sync completion (optional, can be removed for truly silent syncs)
      toast({
        title: "Background sync complete",
        description: `Last synced: ${now.toLocaleTimeString()}`,
        variant: "default"
      });
    } catch (error) {
      // Handle sync errors
      toast({
        title: "Sync error",
        description: "Failed to sync data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  // Handle manual Sync Now button click
  const handleSyncNow = async () => {
    if (syncing) return; // Prevent multiple clicks while syncing
    
    setSyncing(true);
    toast({
      title: "Syncing...",
      description: "Data sync in progress.",
    });
    
    try {
      // Placeholder for sync logic
      await new Promise((res) => setTimeout(res, 2000));
      
      // Update last sync time
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

  // Only show Sync if authenticated and on dashboard or child pages
  const showSyncButton =
    session.isAuthenticated &&
    location.pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Branch selector */}
            {session.isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {currentBranch?.name || "Select Branch"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>Switch Branch</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {branches.map((branch) => (
                    <DropdownMenuItem
                      key={branch.id}
                      onClick={() => handleBranchSwitch(branch.id)}
                      className={
                        currentBranch?.id === branch.id ? "bg-muted" : ""
                      }
                    >
                      {branch.name}
                      {branch.is_main_branch && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (Main)
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Global search bar */}
            {session.isAuthenticated && (
              <div className="hidden md:block">
                <CommandSearch />
              </div>
            )}
          </div>
          {/* Right side: Sync now & User menu */}
          <div className="flex items-center gap-2">
            {showSyncButton && (
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
            )}
            {session.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-wasper-secondary text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
