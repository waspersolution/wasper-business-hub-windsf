import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionProvider } from "@/contexts/SessionContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import POS from "./pages/sales/POS";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Inventory routes */}
            <Route path="/inventory/*" element={<Dashboard />} />
            {/* Sales routes */}
            <Route path="/sales" element={<Navigate to="/sales/pos" replace />} />
            <Route path="/sales/pos" element={<POS />} />
            <Route path="/sales/*" element={<Dashboard />} />
            {/* Purchases routes */}
            <Route path="/purchases/*" element={<Dashboard />} />
            {/* Accounting routes */}
            <Route path="/accounting/*" element={<Dashboard />} />
            {/* Reports routes */}
            <Route path="/reports/*" element={<Dashboard />} />
            {/* Billing routes */}
            <Route path="/billing/*" element={<Dashboard />} />
            {/* Notifications routes */}
            <Route path="/notifications/*" element={<Dashboard />} />
            {/* Settings routes */}
            <Route path="/settings/*" element={<Dashboard />} />
            {/* Audit logs route */}
            <Route path="/audit-logs" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionProvider>
  </QueryClientProvider>
);

export default App;
