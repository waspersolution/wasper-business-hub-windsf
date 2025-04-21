
import { useSession } from "@/contexts/SessionContext";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";

const MOCK_ROLES: UserRole[] = [
  "super_admin",
  "company_admin",
  "branch_manager",
  "staff",
];

export function RoleSwitcher() {
  const { session, setRole } = useSession();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Role:</span>
      <div className="flex gap-1">
        {MOCK_ROLES.map((role) => (
          <Button
            key={role}
            variant={session.currentRole === role ? "default" : "outline"}
            size="sm"
            className="px-2 py-1 text-xs"
            onClick={() => setRole(role)}
          >
            {role.replace("_", " ")}
          </Button>
        ))}
      </div>
    </div>
  );
}
