
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
import { useToast } from "@/components/ui/use-toast";

const ROLES: { role: UserRole; label: string; icon: React.ReactNode }[] = [
  { role: "super_admin", label: "Super Admin", icon: <Shield className="h-3 w-3" /> },
  { role: "company_admin", label: "Company Admin", icon: <Briefcase className="h-3 w-3" /> },
  { role: "branch_manager", label: "Branch Manager", icon: <MapPin className="h-3 w-3" /> },
  { role: "inventory_manager", label: "Inventory", icon: <Archive className="h-3 w-3" /> },
  { role: "sales_manager", label: "Sales", icon: <TrendingUp className="h-3 w-3" /> },
];

// Added a prop to know if called from sidebar, for layout
export function RoleSwitcher({ location = "header" }: { location?: "header" | "sidebar" }) {
  const { session, setRole } = useSession();
  const { toast } = useToast();

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    toast({
      title: "Role Changed",
      description: `You are now viewing the application as a ${role.replace('_', ' ')}`,
    });
  };

  return (
    <div
      className={
        location === "sidebar"
          ? "flex items-center gap-3 justify-between"
          : "flex items-center gap-2"
      }
    >
      <span className="text-xs text-muted-foreground">{location === "sidebar" ? "Test Role:" : "Role:"}</span>
      <div className="flex flex-wrap gap-1">
        {ROLES.map(({ role, label, icon }) => (
          <Button
            key={role}
            variant={session.currentRole === role ? "default" : "outline"}
            size="icon"
            className={
              "p-2 rounded-full border-2 border-transparent " +
              (session.currentRole === role
                ? "border-indigo-400 shadow-md bg-gradient-to-tr from-indigo-400 to-blue-400 text-white scale-110"
                : "hover:border-indigo-300")
            }
            onClick={() => handleRoleChange(role)}
            title={label}
            aria-label={label}
            tabIndex={0}
          >
            {icon}
          </Button>
        ))}
      </div>
    </div>
  );
}
