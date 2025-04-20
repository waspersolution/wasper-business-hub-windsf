
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSession } from "@/contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { session } = useSession();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!session.isAuthenticated) {
      navigate("/login");
    }
  }, [session.isAuthenticated, navigate]);

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
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t py-2 px-4 text-center text-sm text-muted-foreground">
          powered by waspersolution.com
        </footer>
      </div>
    </div>
  );
}
