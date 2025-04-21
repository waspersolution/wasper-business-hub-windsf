
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/contexts/SessionContext";
import { SidebarMenu } from "./SidebarMenu";
import { navigationItems } from "./SidebarNavigationItems";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Settings } from "lucide-react";
import { RoleSwitcher } from "../RoleSwitcher";

export function Sidebar() {
  const { session } = useSession();

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen border-r bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-sm flex flex-col"
    >
      {/* Sidebar Top: App Title and Shortcuts */}
      <div>
        <div className="h-16 flex items-center px-4 border-b">
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-500 via-indigo-400 to-green-400 bg-clip-text text-transparent select-none">
            Wasper Business Hub
          </h2>
        </div>
        {/* Shortcut buttons row */}
        <div className="flex gap-2 px-4 pt-4 pb-2">
          <Link to="/sales/pos" title="POS (New Sale)">
            <button
              className="rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-400 text-white shadow-md hover:scale-105 active:scale-95 transition transform-gpu w-12 h-12 flex items-center justify-center"
            >
              <ShoppingCart size={26} />
            </button>
          </Link>
          <Link to="/inventory/products" title="Add New Item">
            <button
              className="rounded-xl bg-gradient-to-tr from-green-400 to-blue-400 text-white shadow-md hover:scale-105 active:scale-95 transition transform-gpu w-12 h-12 flex items-center justify-center"
            >
              <Plus size={26} />
            </button>
          </Link>
          <Link to="/settings" title="Settings">
            <button
              className="rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-400 text-white shadow-md hover:scale-105 active:scale-95 transition transform-gpu w-12 h-12 flex items-center justify-center"
            >
              <Settings size={26} />
            </button>
          </Link>
        </div>
      </div>
      
      {/* Main navigation */}
      <ScrollArea className="h-[calc(100vh-10rem)] py-2 flex-1">
        <div className="px-3 py-2 space-y-1">
          <SidebarMenu items={navigationItems} />
        </div>
      </ScrollArea>

      {/* Sidebar Footer: move role switcher here */}
      <div className="border-t px-4 py-4 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent shadow-inner">
        <RoleSwitcher location="sidebar" />
      </div>
    </motion.div>
  );
}
