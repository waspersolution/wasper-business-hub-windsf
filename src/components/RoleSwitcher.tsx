
import { useSession } from "@/contexts/SessionContext";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Briefcase, 
  MapPin, 
  Archive, 
  TrendingUp 
} from "lucide-react";

const ROLES: { role: UserRole; label: string; icon: React.ReactNode }[] = [
  { role: "super_admin", label: "Super Admin", icon: <Shield className="h-3 w-3" /> },
  { role: "company_admin", label: "Company Admin", icon: <Briefcase className="h-3 w-3" /> },
  { role: "branch_manager", label: "Branch Manager", icon: <MapPin className="h-3 w-3" /> },
  { role: "inventory_manager", label: "Inventory", icon: <Archive className="h-3 w-3" /> },
  { role: "sales_manager", label: "Sales", icon: <TrendingUp className="h-3 w-3" /> },
];

export function RoleSwitcher() {
  const { session, setRole } = useSession();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden sm:inline">Role:</span>
      <div className="flex flex-wrap gap-1">
        {ROLES.map(({ role, label, icon }) => (
          <Button
            key={role}
            variant={session.currentRole === role ? "default" : "outline"}
            size="sm"
            className="px-2 py-1 text-xs gap-1"
            onClick={() => setRole(role)}
            title={label}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
