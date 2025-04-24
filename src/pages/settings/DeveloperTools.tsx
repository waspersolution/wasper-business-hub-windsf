
import { useSession } from "@/contexts/SessionContext";
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Database, RefreshCw, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MockDataManager } from "./components/MockDataManager";

export default function DeveloperTools() {
  const { session } = useSession();

  // Only super_admin can access this page
  if (session.currentRole !== "super_admin") {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to access this page.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Developer Tools</h1>
          <p className="text-muted-foreground">
            Advanced tools for development and testing. Use with caution.
          </p>
        </div>

        <MockDataManager />
      </div>
    </DashboardLayout>
  );
}
