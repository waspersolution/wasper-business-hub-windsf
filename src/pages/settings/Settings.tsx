
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building,
  Users,
  Shield,
  Tag,
  DollarSign,
  Globe,
  ShoppingCart,
  Smartphone,
  Database,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Settings category definition
type SettingsCategory = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
};

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Define all settings categories
  const settingsCategories: SettingsCategory[] = [
    {
      id: "companies",
      name: "Companies & Branches",
      description: "Manage your company profile, branches, and locations",
      icon: <Building className="w-12 h-12 text-blue-500" />,
      path: "/settings/companies",
    },
    {
      id: "users",
      name: "Users & Roles",
      description: "Manage user accounts, roles, and invitations",
      icon: <Users className="w-12 h-12 text-indigo-500" />,
      path: "/settings/users",
    },
    {
      id: "permissions",
      name: "Permissions",
      description: "Configure granular access rights for users and roles",
      icon: <Shield className="w-12 h-12 text-violet-500" />,
      path: "/settings/permissions",
    },
    {
      id: "attributes",
      name: "Units / Categories / Brands",
      description: "Manage product attributes, categories, and brands",
      icon: <Tag className="w-12 h-12 text-green-500" />,
      path: "/settings/attributes",
    },
    {
      id: "tax-currencies",
      name: "Tax & Currencies",
      description: "Configure tax rates, rules, and currency settings",
      icon: <DollarSign className="w-12 h-12 text-amber-500" />,
      path: "/settings/tax-currencies",
    },
    {
      id: "localization",
      name: "Language & Localization",
      description: "Set language preferences and regional settings",
      icon: <Globe className="w-12 h-12 text-cyan-500" />,
      path: "/settings/localization",
    },
    {
      id: "pos",
      name: "POS Settings",
      description: "Configure point of sale behavior and receipt templates",
      icon: <ShoppingCart className="w-12 h-12 text-orange-500" />,
      path: "/settings/pos",
    },
    {
      id: "devices",
      name: "Device Management",
      description: "Manage devices, printers, and terminals",
      icon: <Smartphone className="w-12 h-12 text-rose-500" />,
      path: "/settings/devices",
    },
    {
      id: "backup-restore",
      name: "Backup & Restore",
      description: "Backup your data or restore from previous backups",
      icon: <Database className="w-12 h-12 text-emerald-500" />,
      path: "/settings/backup-restore",
    },
  ];

  // Navigate to a specific setting page
  const navigateToSetting = (path: string) => {
    navigate(path);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your business preferences and system settings.
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-2 h-auto p-1">
            <TabsTrigger value="overview" className="py-2">
              Overview
            </TabsTrigger>
            <TabsTrigger value="recent" className="py-2">
              Recently Used
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {settingsCategories.map((category) => (
                <Card 
                  key={category.id}
                  className="hover:shadow-md transition-shadow cursor-pointer border-l-4"
                  style={{ borderLeftColor: getColorForCategory(category.id) }}
                  onClick={() => navigateToSetting(category.path)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-md bg-muted/50">
                        {category.icon}
                      </div>
                    </div>
                    <CardTitle className="mt-4">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToSetting(category.path);
                      }}
                    >
                      Configure &rarr;
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="border rounded-md p-8 text-center">
              <p className="text-muted-foreground">
                Your recently accessed settings will appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Helper function to get color for category
function getColorForCategory(id: string): string {
  const colorMap: Record<string, string> = {
    companies: "#3b82f6", // blue-500
    users: "#6366f1", // indigo-500
    permissions: "#8b5cf6", // violet-500
    attributes: "#22c55e", // green-500
    "tax-currencies": "#f59e0b", // amber-500
    localization: "#06b6d4", // cyan-500
    pos: "#f97316", // orange-500
    devices: "#f43f5e", // rose-500
    "backup-restore": "#10b981", // emerald-500
  };

  return colorMap[id] || "#6366f1";
}
