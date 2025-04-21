
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/contexts/SessionContext";
import { SidebarMenu } from "./SidebarMenu";
import { navigationItems } from "./SidebarNavigationItems";
import { motion } from "framer-motion";

export function Sidebar() {
  const { session } = useSession();

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen border-r bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-sm"
    >
      <div className="h-16 flex items-center px-4 border-b">
        <h2 className="text-lg font-bold bg-gradient-to-r from-wasper-primary to-wasper-secondary bg-clip-text text-transparent">
          Wasper Business Hub
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] py-2">
        <div className="px-3 py-2 space-y-1">
          <SidebarMenu items={navigationItems} />
        </div>
      </ScrollArea>
    </motion.div>
  );
}
