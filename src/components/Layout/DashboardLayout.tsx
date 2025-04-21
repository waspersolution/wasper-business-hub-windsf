
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSession } from "@/contexts/SessionContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar - only visible on desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto">
            {showBack && (
              <div className="mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(-1)}
                  aria-label="Go back to previous page"
                  className="flex items-center gap-2 rounded-full hover:shadow-md transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            )}
            {children}
          </div>
        </motion.main>
        
        {/* Footer */}
        <footer className="border-t py-3 px-4 text-center text-sm text-muted-foreground bg-white dark:bg-gray-800 shadow-sm">
          <span className="text-wasper-secondary font-medium">powered by</span> waspersolution.com
        </footer>
      </div>
      
      <Toaster />
    </div>
  );
}
