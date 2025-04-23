
import { Building, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBranchSelection } from "@/hooks/use-branch-selection";
import { useToast } from "@/hooks/use-toast";

export const BranchSelector = () => {
  const { currentBranch, branches, switchBranch } = useBranchSelection();
  const { toast } = useToast();

  const handleBranchSwitch = (branchId: string) => {
    switchBranch(branchId);
    toast({
      title: "Branch switched",
      description: `Branch switched to ${branches.find(b => b.id === branchId)?.name}`,
      variant: "default"
    });
  };

  return (
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
  );
};
