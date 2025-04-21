
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/contexts/SessionContext";
import { SidebarMenu } from "./SidebarMenu";
import { navigationItems } from "./SidebarNavigationItems";

export function Sidebar() {
  const { session } = useSession();

  return (
    <div className="h-screen border-r bg-background">
      <div className="h-16 flex items-center px-4 border-b">
        <h2 className="text-lg font-semibold text-wasper-primary">
          Wasper Business Hub
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] py-2">
        <div className="px-3 py-2 space-y-1">
          <SidebarMenu items={navigationItems} />
        </div>
      </ScrollArea>
    </div>
  );
}
