
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
import { Building, ChevronDown } from "lucide-react";
import { refreshCw } from "lucide-react/icons";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Header() {
  const { session, clearSession } = useSession();
  const { currentBranch, branches, switchBranch } = useBranchSelection();
  const { toast } = useToast();
  const location = useLocation();
  const [syncing, setSyncing] = useState(false);

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
      variant: "success"
    });
  };

  // Handle Sync Now button
  const handleSyncNow = async () => {
    setSyncing(true);
    toast({
      title: "Syncing...",
      description: "Data sync in progress.",
    });
    // Placeholder for sync logic
    await new Promise((res) => setTimeout(res, 2000));
    setSyncing(false);
    toast({
      title: "Sync complete!",
      description: "Your data is up to date.",
      variant: "success"
    });
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
          </div>
          {/* Right side: Sync now & User menu */}
          <div className="flex items-center gap-2">
            {showSyncButton && (
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={handleSyncNow}
                disabled={syncing}
                aria-label="Sync Now"
              >
                <RefreshCw className={`h-5 w-5 transition-transform ${syncing ? 'animate-spin' : ''}`} />
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
