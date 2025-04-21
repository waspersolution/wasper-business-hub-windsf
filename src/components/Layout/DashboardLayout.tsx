
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSession } from "@/contexts/SessionContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { session } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!session.isAuthenticated) {
      navigate("/login");
    }
  }, [session.isAuthenticated, navigate]);

  // Show Back button if it's not the dashboard route
  const isDashboardRoute = location.pathname === "/dashboard";
  const showBack = !isDashboardRoute;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="container mx-auto">
            {showBack && (
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(-1)}
                  aria-label="Go back to previous page"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            )}
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t py-2 px-4 text-center text-sm text-muted-foreground">
          powered by waspersolution.com
        </footer>
      </div>
      
      <Toaster />
    </div>
  );
}
