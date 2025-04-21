
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/contexts/SessionContext";
import { SidebarMenu } from "./SidebarMenu";
import { navigationItems } from "./SidebarNavigationItems";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Clock, UserPlus } from "lucide-react";
import { RoleSwitcher } from "../RoleSwitcher";
import {
  Sidebar as ShadSidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function Sidebar() {
  const { session } = useSession();

  return (
    <SidebarProvider>
      <ShadSidebar
        className="bg-gradient-to-b from-white via-slate-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 border-r shadow-lg h-full flex flex-col overflow-hidden"
        collapsible="none"
      >
        <SidebarHeader className="!p-0">
          {/* Sidebar Top: App Title and Shortcuts */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="border-b"
          >
            <div className="h-16 flex items-center px-4">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-500 via-indigo-400 to-green-400 bg-clip-text text-transparent select-none tracking-wide">
                Wasper Business Hub
              </h2>
            </div>
            <div className="flex gap-3 px-4 pt-3 pb-2">
              <Link to="/sales/pos" title="POS (New Sale)" tabIndex={0}>
                <button
                  className="rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-400 text-white shadow-lg hover:scale-110 active:scale-95 transition-all w-12 h-12 flex items-center justify-center focus:ring-2 focus:ring-blue-300"
                >
                  <ShoppingCart size={26} />
                </button>
              </Link>
              <Link to="/inventory/products" title="Add New Item" tabIndex={0}>
                <button
                  className="rounded-xl bg-gradient-to-tr from-green-400 to-blue-400 text-white shadow-lg hover:scale-110 active:scale-95 transition-all w-12 h-12 flex items-center justify-center focus:ring-2 focus:ring-green-300"
                >
                  <Plus size={26} />
                </button>
              </Link>
              <Link to="/sales/customers" title="Add New Customer" tabIndex={0}>
                <button
                  className="rounded-xl bg-gradient-to-tr from-orange-400 to-pink-500 text-white shadow-lg hover:scale-110 active:scale-95 transition-all w-12 h-12 flex items-center justify-center focus:ring-2 focus:ring-pink-300"
                >
                  <UserPlus size={26} />
                </button>
              </Link>
              <Link to="/sales/pos#drafts" title="Resume Draft" tabIndex={0}>
                <button
                  className="rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-400 text-white shadow-lg hover:scale-110 active:scale-95 transition-all w-12 h-12 flex items-center justify-center focus:ring-2 focus:ring-amber-300"
                >
                  <Clock size={26} />
                </button>
              </Link>
            </div>
          </motion.div>
        </SidebarHeader>

        <SidebarContent className="py-0 flex-1 min-h-0">
          <ScrollArea className="h-full flex-1">
            <div className="px-3 py-2 space-y-1">
              <SidebarMenu items={navigationItems} />
            </div>
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter className="border-t px-4 py-4 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent shadow-inner">
          <RoleSwitcher location="sidebar" />
        </SidebarFooter>
      </ShadSidebar>
    </SidebarProvider>
  );
}
